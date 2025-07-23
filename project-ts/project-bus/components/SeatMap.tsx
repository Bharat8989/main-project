'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookingStore } from '@/store/bookingStore';

interface SeatMapProps {
  bus: any;
  onSeatSelect: (seats: number[]) => void;
}

export default function SeatMap({ bus, onSeatSelect }: SeatMapProps) {
  const { selectedSeats, setSelectedSeats } = useBookingStore();
  const [seatLayout, setSeatLayout] = useState<number[][]>([]);

  useEffect(() => {
    // Create seat layout (2x2 configuration for simplicity)
    const layout = [];
    const seatsPerRow = 4;
    const totalRows = Math.ceil(bus.seatCapacity / seatsPerRow);
    
    for (let row = 0; row < totalRows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatNumber = row * seatsPerRow + seat;
        if (seatNumber <= bus.seatCapacity) {
          rowSeats.push(seatNumber);
        }
      }
      layout.push(rowSeats);
    }
    setSeatLayout(layout);
  }, [bus.seatCapacity]);

  const handleSeatClick = (seatNumber: number) => {
    if (bus.bookedSeats.includes(seatNumber)) return;
    
    let newSelectedSeats;
    if (selectedSeats.includes(seatNumber)) {
      newSelectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
      if (selectedSeats.length >= 6) return; // Max 6 seats
      newSelectedSeats = [...selectedSeats, seatNumber];
    }
    
    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStatus = (seatNumber: number) => {
    if (bus.bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (seatNumber: number) => {
    const status = getSeatStatus(seatNumber);
    const baseClass = "w-10 h-10 m-1 rounded-lg border-2 font-semibold text-xs transition-all duration-200 ";
    
    switch (status) {
      case 'booked':
        return baseClass + "bg-red-100 border-red-300 text-red-700 cursor-not-allowed";
      case 'selected':
        return baseClass + "bg-blue-500 border-blue-600 text-white cursor-pointer hover:bg-blue-600";
      case 'available':
        return baseClass + "bg-green-100 border-green-300 text-green-700 cursor-pointer hover:bg-green-200 hover:border-green-400";
      default:
        return baseClass;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Select Your Seats</CardTitle>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
            <span>Booked</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-6 rounded-lg">
          {/* Driver section */}
          <div className="flex justify-end mb-4">
            <div className="w-12 h-8 bg-gray-400 rounded-t-lg flex items-center justify-center text-white text-xs font-bold">
              DRIVER
            </div>
          </div>
          
          {/* Seat layout */}
          <div className="space-y-2">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-4">
                {/* Left side seats */}
                <div className="flex space-x-1">
                  {row.slice(0, 2).map((seatNumber) => (
                    <Button
                      key={seatNumber}
                      variant="ghost"
                      size="sm"
                      className={getSeatClassName(seatNumber)}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bus.bookedSeats.includes(seatNumber)}
                    >
                      {seatNumber}
                    </Button>
                  ))}
                </div>
                
                {/* Aisle */}
                <div className="w-8"></div>
                
                {/* Right side seats */}
                <div className="flex space-x-1">
                  {row.slice(2, 4).map((seatNumber) => (
                    <Button
                      key={seatNumber}
                      variant="ghost"
                      size="sm"
                      className={getSeatClassName(seatNumber)}
                      onClick={() => handleSeatClick(seatNumber)}
                      disabled={bus.bookedSeats.includes(seatNumber)}
                    >
                      {seatNumber}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </p>
            <p className="text-lg font-bold text-blue-600 mt-2">
              Total Amount: ₹{selectedSeats.length * bus.fare}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}