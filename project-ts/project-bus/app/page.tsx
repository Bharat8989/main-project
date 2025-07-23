import SearchForm from '@/components/SearchForm';
import { Card, CardContent } from '@/components/ui/card';
import { Bus, Clock, Shield, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Your Bus Journey
            <span className="block text-blue-600">With Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience comfortable and reliable bus travel. Search, compare, and book bus tickets 
            across India with real-time availability and instant confirmation.
          </p>
          
          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose BusBook?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide Network</h3>
                <p className="text-gray-600">
                  Connect to 1000+ destinations across India with our extensive bus network.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Track your bus in real-time and get live updates on departure and arrival.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
                <p className="text-gray-600">
                  Safe and secure payment gateway with instant booking confirmation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Compare prices and get the best deals on bus tickets with exclusive offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Routes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { from: 'Mumbai', to: 'Pune', price: '₹350', duration: '3h 30m' },
              { from: 'Delhi', to: 'Jaipur', price: '₹450', duration: '5h 15m' },
              { from: 'Bangalore', to: 'Chennai', price: '₹650', duration: '6h 45m' },
              { from: 'Hyderabad', to: 'Vijayawada', price: '₹380', duration: '4h 20m' },
              { from: 'Kolkata', to: 'Bhubaneswar', price: '₹420', duration: '7h 30m' },
              { from: 'Ahmedabad', to: 'Mumbai', price: '₹520', duration: '8h 15m' },
            ].map((route, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {route.from} → {route.to}
                      </h3>
                      <p className="text-gray-600">Duration: {route.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{route.price}</p>
                      <p className="text-sm text-gray-500">per person</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}