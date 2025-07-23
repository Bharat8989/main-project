import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bus from '@/models/Bus';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const bus = await Bus.findById(params.id);
    
    if (!bus) {
      return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
    }
    
    return NextResponse.json(bus);
  } catch (error) {
    console.error('Get bus error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const bus = await Bus.findByIdAndUpdate(params.id, busData, { new: true });
    
    if (!bus) {
      return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
    }
    
    return NextResponse.json(bus);
  } catch (error) {
    console.error('Update bus error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const bus = await Bus.findByIdAndDelete(params.id);
    
    if (!bus) {
      return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Delete bus error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}