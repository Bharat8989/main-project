'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Wifi, Coffee, Tv } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSelectedBus } = useBookingStore();
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const source = searchParams.get('source');
        const destination = searchParams.get('destination');
        const date = searchParams.get('date');
        
        if (!source || !destination || !date) {
          router.push('/');
          return;
        }

        const params = new URLSearchParams({ source, destination, date });
        const response = await fetch(`/api/buses/search?${params}`);
        const data = await response.json();

        if (response.ok) {
          setBuses(data);
        } else {
          toast.error('Failed to search buses');
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuses();
  }, [searchParams, router]);

  const handleBookNow = (bus: any) => {
    setSelectedBus(bus);
    router.push(`/book/${bus._id}`);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'refreshments':
        return <Coffee className="w-4 h-4" />;
      case 'entertainment':
        return <Tv className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            {searchParams.get('source')} → {searchParams.get('destination')} on{' '}
            {searchParams.get('date') && format(new Date(searchParams.get('date')!), 'PPP')}
          </p>
        </div>

        {buses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-600 mb-6">
                Sorry, no buses are available for the selected route and date.
              </p>
              <Button onClick={() => router.push('/')}>
                Search Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {buses.map((bus: any) => (
              <Card key={bus._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                    {/* Bus Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{bus.name}</h3>
                          <p className="text-gray-600">{bus.number}</p>
                          <Badge variant="secondary" className="mt-1">
                            {bus.busType}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{bus.source}</span>
                        </div>
                        <span>→</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{bus.destination}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      {bus.amenities && bus.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.map((amenity: string, index: number) => (
                            <div key={index} className="flex items-center space-x-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timing */}
                    <div className="text-center">
                      <div className="space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{bus.departureTime}</p>
                          <p className="text-sm text-gray-600">{bus.source}</p>
                        </div>
                        <div className="flex items-center justify-center text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">4h 30m</span>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{bus.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{bus.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Booking */}
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-3xl font-bold text-blue-600">₹{bus.fare}</p>
                        <p className="text-sm text-gray-600">per seat</p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{bus.seatCapacity - bus.bookedSeats.length} seats available</span>
                      </div>
                      
                      <Button
                        onClick={() => handleBookNow(bus)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={bus.seatCapacity - bus.bookedSeats.length === 0}
                      >
                        {bus.seatCapacity - bus.bookedSeats.length === 0 ? 'Sold Out' : 'Book Now'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}