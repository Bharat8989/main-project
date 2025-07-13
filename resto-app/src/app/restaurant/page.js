'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSingUp";
import RestaurantHeader from "../_components/restaurantHeader";
import RestaurantFooter from "../_components/restaurantFooter";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <RestaurantHeader />

      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold">{login ? "Login" : "Sign Up"} Page</h1>
        <button
          onClick={() => setLogin(!login)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {login ? "Go to Sign Up" : "Go to Login"}
        </button>
      </div>

      {login ? <RestaurantLogin /> : <RestaurantSignUp />}

      <RestaurantFooter />
    </div>
  );
};

export default Restaurant;
