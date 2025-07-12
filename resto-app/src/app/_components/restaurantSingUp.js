const RestaurantSignUp = () => {
     return (
       <>
         <h1>SignUp </h1>

         <div>
           <div className="input-wrapper">
             <input
               type="text"
               placeholder=" email id"
               className="input-field"
             />
           </div>
           <div className="input-wrapper">
             <input
               type="password"
               placeholder="Enter password"
               className="input-field"
             />
           </div>
           <div className="input-wrapper">
             <input
               type="password"
               placeholder="Confirm password"
               className="input-field"
             />
           </div>
            <div className="input-wrapper">
             <input
               type="password"
               placeholder="Confirm password"
               className="input-field"
             />
           </div>
            <div className="input-wrapper">
             <input
               type="password"
               placeholder="Enter restaurant name"
               className="input-field"
             />
           </div>
           <div className="input-wrapper">
             <input
               type="password"
               placeholder="Enter City "
               className="input-field"
             />
           </div>
            <div className="input-wrapper">
             <input
               type="password"
               placeholder="enter full address"
               className="input-field"
             />
           </div>
            <div className="input-wrapper">
             <input
               type="password"
               placeholder="enter contact No.  "
               className="input-field"
             />
           </div>
           <div className="input-wrapper">
             <button type="submit" className="input-field cursor-pointer">
               SignUp
             </button>
           </div>
         </div>
       </>
     );
}
export default RestaurantSignUp;