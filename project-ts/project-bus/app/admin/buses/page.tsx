'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuthStore } from '@/store/authStore';
import { Plus, Edit, Trash2, Bus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

export default function AdminBuses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, token } = useAuthStore();
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    seatCapacity: 40,
    fare: 0,
    busType: 'Non-AC',
    date: '',
    amenities: [] as string[],
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchBuses();

    // Check if add action is requested
    if (searchParams.get('action') === 'add') {
      setIsDialogOpen(true);
    }
  }, [isAuthenticated, user, router, searchParams]);

  const fetchBuses = async () => {
    try {
      const response = await fetch('/api/buses');
      const data = await response.json();

      if (response.ok) {
        setBuses(data);
      } else {
        toast.error('Failed to fetch buses');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingBus ? `/api/buses/${editingBus._id}` : '/api/buses';
      const method = editingBus ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingBus ? 'Bus updated successfully' : 'Bus created successfully');
        setIsDialogOpen(false);
        resetForm();
        fetchBuses();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (bus: any) => {
    setEditingBus(bus);
    setFormData({
      name: bus.name,
      number: bus.number,
      source: bus.source,
      destination: bus.destination,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      seatCapacity: bus.seatCapacity,
      fare: bus.fare,
      busType: bus.busType,
      date: format(new Date(bus.date), 'yyyy-MM-dd'),
      amenities: bus.amenities || [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (busId: string) => {
    if (!confirm('Are you sure you want to delete this bus?')) {
      return;
    }

    try {
      const response = await fetch(`/api/buses/${busId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Bus deleted successfully');
        fetchBuses();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Delete failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const resetForm = () => {
    setEditingBus(null);
    setFormData({
      name: '',
      number: '',
      source: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      seatCapacity: 40,
      fare: 0,
      busType: 'Non-AC',
      date: '',
      amenities: [],
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Buses</h1>
            <p className="text-gray-600">Add, edit, and manage your bus fleet</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Bus
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBus ? 'Edit Bus' : 'Add New Bus'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Bus Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Volvo Express"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="number">Bus Number</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      placeholder="e.g., MH12AB1234"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <Input
                      id="source"
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      placeholder="e.g., Mumbai"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      placeholder="e.g., Pune"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="departureTime">Departure Time</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => handleInputChange('departureTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="arrivalTime">Arrival Time</Label>
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Journey Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="busType">Bus Type</Label>
                    <Select 
                      value={formData.busType} 
                      onValueChange={(value) => handleInputChange('busType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="Non-AC">Non-AC</SelectItem>
                        <SelectItem value="Sleeper">Sleeper</SelectItem>
                        <SelectItem value="Semi-Sleeper">Semi-Sleeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="seatCapacity">Seat Capacity</Label>
                    <Input
                      id="seatCapacity"
                      type="number"
                      value={formData.seatCapacity}
                      onChange={(e) => handleInputChange('seatCapacity', parseInt(e.target.value))}
                      min="10"
                      max="60"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fare">Fare (₹)</Label>
                    <Input
                      id="fare"
                      type="number"
                      value={formData.fare}
                      onChange={(e) => handleInputChange('fare', parseInt(e.target.value))}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingBus ? 'Update Bus' : 'Add Bus'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Buses List */}
        {buses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-600 mb-6">Start by adding your first bus to the fleet.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Add First Bus
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {buses.map((bus: any) => (
              <Card key={bus._id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{bus.name}</CardTitle>
                      <p className="text-gray-600">{bus.number}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(bus)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(bus._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-semibold">{bus.source} → {bus.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold">{format(new Date(bus.date), 'PPP')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold">{bus.departureTime} - {bus.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold">{bus.busType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fare:</span>
                      <span className="font-semibold text-blue-600">₹{bus.fare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold">{bus.seatCapacity} seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold text-green-600">
                        {bus.seatCapacity - bus.bookedSeats.length} seats
                      </span>
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