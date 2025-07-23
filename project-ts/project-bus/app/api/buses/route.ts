import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bus from '@/models/Bus';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const buses = await Bus.find({}).sort({ createdAt: -1 });
    return NextResponse.json(buses);
  } catch (error) {
    console.error('Get buses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Check authentication and admin role
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const busData = await request.json();
    const bus = new Bus(busData);
    await bus.save();
    
    return NextResponse.json(bus, { status: 201 });
  } catch (error) {
    console.error('Create bus error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}