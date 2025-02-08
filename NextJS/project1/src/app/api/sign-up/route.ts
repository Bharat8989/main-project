import dbConnect from '@/src/lib/dbConnect';
import UserModel from '@/src/model/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/src/helpers/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    // console.log('Request Body:', { username, email, password });
    
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingVerifiedUserByUsername = await UserModel.findOne({ username, isVerified: true });
    if (existingVerifiedUserByUsername) {
      return new Response(
        JSON.stringify({ success: false, message: 'Username is already taken' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return new Response(
          JSON.stringify({ success: false, message: 'User already exists with this email' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();
    } else {
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 3600000),
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode);
    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ success: false, message: emailResponse.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User registered successfully. Please verify your account.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error registering user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}