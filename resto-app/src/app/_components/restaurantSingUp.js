const RestaurantSignUp = () => (
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
    <h2 className="text-xl font-semibold text-center mb-4">Restaurant SignUp</h2>
    
    {["Email ID", "Password", "Confirm Password", "Restaurant Name", "City", "Full Address", "Contact No"].map((placeholder, index) => (
      <input
        key={index}
        type="text"
        placeholder={placeholder}
        className="w-full p-2 mb-3 border rounded"
      />
    ))}
    
    <button className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">Sign Up</button>
  </div>
);
export default RestaurantSignUp;
