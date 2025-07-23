import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bus from '@/models/Bus';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');
    
    if (!source || !destination || !date) {
      return NextResponse.json(
        { error: 'Source, destination, and date are required' },
        { status: 400 }
      );
    }
    
    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
    
    const buses = await Bus.find({
      source: { $regex: source, $options: 'i' },
      destination: { $regex: destination, $options: 'i' },
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ departureTime: 1 });
    
    return NextResponse.json(buses);
  } catch (error) {
    console.error('Bus search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}