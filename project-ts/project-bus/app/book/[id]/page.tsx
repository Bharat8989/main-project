'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SeatMap from '@/components/SeatMap';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';
import { toast } from 'react-hot-toast';

export default function BookBus() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated, token } = useAuthStore();
  const { selectedSeats, selectedBus, clearBooking } = useBookingStore();
  const [bus, setBus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [passengerDetails, setPassengerDetails] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchBus = async () => {
      try {
        const response = await fetch(`/api/buses/${params.id}`);
        const data = await response.json();

        if (response.ok) {
          setBus(data);
        } else {
          toast.error('Bus not found');
          router.push('/');
        }
      } catch (error) {
        toast.error('Something went wrong');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBus();
  }, [params.id, isAuthenticated, router]);

  useEffect(() => {
    // Initialize passenger details when seats are selected
    if (selectedSeats.length > 0) {
      const details = selectedSeats.map(seatNumber => ({
        name: '',
        age: '',
        gender: '',
        seatNumber,
      }));
      setPassengerDetails(details);
    }
  }, [selectedSeats]);

  const handleSeatSelect = (seats: number[]) => {
    // Seat selection is handled by the SeatMap component
  };

  const handlePassengerDetailChange = (index: number, field: string, value: string) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setPassengerDetails(updatedDetails);
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    if (!contactNumber || contactNumber.length < 10) {
      toast.error('Please enter a valid contact number');
      return;
    }

    // Validate passenger details
    for (let i = 0; i < passengerDetails.length; i++) {
      const passenger = passengerDetails[i];
      if (!passenger.name || !passenger.age || !passenger.gender) {
        toast.error(`Please fill all details for passenger ${i + 1}`);
        return;
      }
    }

    setIsBooking(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          busId: bus._id,
          seats: selectedSeats,
          passengerDetails,
          contactNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Booking confirmed successfully!');
        clearBooking();
        router.push('/my-bookings');
      } else {
        toast.error(data.error || 'Booking failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bus details...</p>
        </div>
      </div>
    );
  }

  if (!bus) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Journey</h1>
          <p className="text-gray-600">
            {bus.source} → {bus.destination} | {bus.name} ({bus.number})
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seat Selection */}
          <div>
            <SeatMap bus={bus} onSeatSelect={handleSeatSelect} />
          </div>

          {/* Passenger Details */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="Enter your contact number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Details */}
            {selectedSeats.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {passengerDetails.map((passenger, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-3">
                          Passenger {index + 1} (Seat {passenger.seatNumber})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor={`name-${index}`}>Name</Label>
                            <Input
                              id={`name-${index}`}
                              placeholder="Full name"
                              value={passenger.name}
                              onChange={(e) => handlePassengerDetailChange(index, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`age-${index}`}>Age</Label>
                            <Input
                              id={`age-${index}`}
                              type="number"
                              placeholder="Age"
                              value={passenger.age}
                              onChange={(e) => handlePassengerDetailChange(index, 'age', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`gender-${index}`}>Gender</Label>
                            <Select
                              value={passenger.gender}
                              onValueChange={(value) => handlePassengerDetailChange(index, 'gender', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Selected Seats:</span>
                      <span className="font-semibold">{selectedSeats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Passengers:</span>
                      <span className="font-semibold">{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fare per seat:</span>
                      <span className="font-semibold">₹{bus.fare}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">₹{selectedSeats.length * bus.fare}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={isBooking || selectedSeats.length === 0}
                    className="w-full mt-6 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {isBooking ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}