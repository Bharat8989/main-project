'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { format } from 'date-fns';

export default function SearchForm() {
  const router = useRouter();
  const { setSearchParams } = useBookingStore();
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.source || !formData.destination || !formData.date) {
      return;
    }
    
    setSearchParams(formData);
    const params = new URLSearchParams({
      source: formData.source,
      destination: formData.destination,
      date: formData.date,
    });
    router.push(`/search-results?${params.toString()}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Set minimum date to today
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Find Your Perfect Bus Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                From
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="source"
                  type="text"
                  placeholder="Enter source city"
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
                To
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="destination"
                  type="text"
                  placeholder="Enter destination city"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Journey Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  min={today}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Buses
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}