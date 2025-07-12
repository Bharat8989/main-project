'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSingUp";

const Restaurant= ()=>{
    const [login,setLogin]=useState(true)
    return (
      <>
        <h1>Restaurant login / SignUp Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
        {/* <RestaurantLogin />
        <RestaurantSignUp /> */}
       <div>
        <button onClick={()=>setLogin(!login)}>
            {login ? "Restaurant Sign IN" : "Restaurant Login"}
        </button>
       </div>
      </>
    );
}
export default Restaurant;