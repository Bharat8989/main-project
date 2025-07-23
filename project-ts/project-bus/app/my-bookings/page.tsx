'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';
import { Calendar, MapPin, Phone, Users } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export default function MyBookings() {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchBookings();
  }, [isAuthenticated, router, token]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBookings(data);
      } else {
        toast.error('Failed to fetch bookings');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Booking cancelled successfully');
        fetchBookings(); // Refresh bookings
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to cancel booking');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your bus reservations</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start planning your journey!
              </p>
              <Button onClick={() => router.push('/')}>
                Search Buses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking: any) => (
              <Card key={booking._id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {booking.busId.name}
                      </CardTitle>
                      <p className="text-gray-600">{booking.busId.number}</p>
                    </div>
                    <Badge 
                      variant={booking.status === 'booked' ? 'default' : 'destructive'}
                      className="text-sm"
                    >
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Route Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Route</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{booking.busId.source}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{booking.busId.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Journey Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{format(new Date(booking.busId.date), 'PPP')}</span>
                        </div>
                        <p>Departure: {booking.busId.departureTime}</p>
                        <p>Arrival: {booking.busId.arrivalTime}</p>
                      </div>
                    </div>

                    {/* Passenger Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Passengers</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{booking.seats.length} passengers</span>
                        </div>
                        <p>Seats: {booking.seats.join(', ')}</p>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{booking.contactNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment & Actions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Payment</h4>
                      <div className="space-y-3">
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{booking.totalAmount}
                        </p>
                        <p className="text-xs text-gray-500">
                          Booked on {format(new Date(booking.createdAt), 'PPp')}
                        </p>
                        
                        {booking.status === 'booked' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelBooking(booking._id)}
                            className="w-full"
                          >
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Passenger Details */}
                  {booking.passengerDetails && booking.passengerDetails.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">Passenger Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {booking.passengerDetails.map((passenger: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium">{passenger.name}</p>
                            <p className="text-sm text-gray-600">
                              Age: {passenger.age} | Gender: {passenger.gender}
                            </p>
                            <p className="text-sm text-blue-600">Seat {passenger.seatNumber}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}