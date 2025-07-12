const RestaurantLogin = () => {
    return (
      <>
        <h1>Login Components</h1>

        <div>
          <div className="input-wrapper">
            <input type="text" placeholder="Enter email id" className="input-field" />
          </div>
          <div className="input-wrapper">
            <input type="password" placeholder="Enter password" className="input-field" />
          </div>
          <div className="input-wrapper">
            <button  type="submit" className="input-field cursor-pointer">Login</button>
          </div>
        </div>
      </>
    );
}
export default RestaurantLogin;