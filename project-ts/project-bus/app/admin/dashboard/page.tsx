'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Bus, Users, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();
  const [stats, setStats] = useState({
    totalBuses: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeRoutes: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, user, router, token]);

  const fetchDashboardData = async () => {
    try {
      // Fetch buses
      const busResponse = await fetch('/api/buses');
      const buses = await busResponse.json();

      // Fetch bookings
      const bookingResponse = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const bookings = await bookingResponse.json();

      if (busResponse.ok && bookingResponse.ok) {
        const activeBookings = bookings.filter((b: any) => b.status === 'booked');
        const totalRevenue = activeBookings.reduce((sum: number, booking: any) => sum + booking.totalAmount, 0);
        const routes = new Set(buses.map((bus: any) => `${bus.source}-${bus.destination}`));

        setStats({
          totalBuses: buses.length,
          totalBookings: activeBookings.length,
          totalRevenue,
          activeRoutes: routes.size,
        });

        setRecentBookings(bookings.slice(0, 5));
      }
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBuses}</div>
              <p className="text-xs text-muted-foreground">Active fleet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">Active reservations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From active bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeRoutes}</div>
              <p className="text-xs text-muted-foreground">Operational routes</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Manage Buses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Add, edit, or remove buses from your fleet.</p>
              <Link href="/admin/buses">
                <Button className="w-full">Manage Buses</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>View Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Monitor and manage all customer bookings.</p>
              <Link href="/admin/bookings">
                <Button className="w-full">View Bookings</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Bus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Quickly add a new bus to your fleet.</p>
              <Link href="/admin/buses?action=add">
                <Button className="w-full">Add Bus</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No recent bookings</p>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking: any) => (
                  <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{booking.busId.name}</p>
                      <p className="text-sm text-gray-600">
                        {booking.busId.source} → {booking.busId.destination}
                      </p>
                      <p className="text-xs text-gray-500">
                        Booked by: {booking.userId.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₹{booking.totalAmount}</p>
                      <p className="text-sm text-gray-600">{booking.seats.length} seats</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}