const RestaurantLogin = () => (
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    <h2 className="text-xl font-semibold text-center mb-4">Restaurant Login</h2>
    <input type="email" placeholder="Enter email" className="w-full p-2 mb-3 border rounded" />
    <input type="password" placeholder="Enter password" className="w-full p-2 mb-3 border rounded" />
    <button className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Login</button>
  </div>
);
export default RestaurantLogin;
