import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Bus from '@/models/Bus';
import User from '@/models/User';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    let bookings;
    if (decoded.role === 'admin') {
      bookings = await Booking.find({})
        .populate('userId', 'name email')
        .populate('busId')
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ userId: decoded.userId })
        .populate('busId')
        .sort({ createdAt: -1 });
    }
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const { busId, seats, passengerDetails, contactNumber } = await request.json();
    
    // Get bus details
    const bus = await Bus.findById(busId);
    if (!bus) {
      return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
    }
    
    // Check if seats are available
    const unavailableSeats = seats.filter((seat: number) => 
      bus.bookedSeats.includes(seat)
    );
    
    if (unavailableSeats.length > 0) {
      return NextResponse.json(
        { error: 'Some seats are already booked' },
        { status: 400 }
      );
    }
    
    // Calculate total amount
    const totalAmount = seats.length * bus.fare;
    
    // Create booking
    const booking = new Booking({
      userId: decoded.userId,
      busId,
      seats,
      totalAmount,
      passengerDetails,
      contactNumber,
    });
    
    await booking.save();
    
    // Update bus booked seats
    bus.bookedSeats.push(...seats);
    await bus.save();
    
    // Update user bookings
    await User.findByIdAndUpdate(decoded.userId, {
      $push: { bookings: booking._id }
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}