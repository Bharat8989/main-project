// Ensure this is a normal functional component, not async
const VerificationEmail = ({ username, otp }: { username: string; otp: string }) => {
  return (
    <div>
      <h1>Verify Your Account</h1>
      <p>Hi {username},</p>
      <p>Your verification code is: <strong>{otp}</strong></p>
      <p>Enter this code to complete your registration.</p>
    </div>
  );
};

export default VerificationEmail;
