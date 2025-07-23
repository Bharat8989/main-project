import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Bus from '@/models/Bus';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    // Check if user owns the booking or is admin
    if (booking.userId.toString() !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    if (booking.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Booking is already cancelled' },
        { status: 400 }
      );
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    // Remove seats from bus booked seats
    const bus = await Bus.findById(booking.busId);
    if (bus) {
      bus.bookedSeats = bus.bookedSeats.filter(
        (seat: number) => !booking.seats.includes(seat)
      );
      await bus.save();
    }
    
    return NextResponse.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}