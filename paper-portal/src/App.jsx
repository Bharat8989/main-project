import { loginUser, getCurrentUser, logoutUser } from "./appwrite/auth";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const session = await loginUser(email, password);
      console.log("Login success:", session);
      alert("Login successful ✅");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const checkLogin = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Logged in user:", user);
      alert("User is logged in ✅");
    } catch {
      alert("User NOT logged in ❌");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    alert("Logged out");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Appwrite Login Test</h1>

      <input
        className="border p-2 w-full"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2">
        Login
      </button>

      <button onClick={checkLogin} className="bg-green-600 text-white px-4 py-2">
        Check Login
      </button>

      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
}

export default App;
