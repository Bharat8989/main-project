"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminLogin() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {

      await account.createEmailPasswordSession(email, password);

      alert("Login Successful");

      // ✅ Redirect to Dashboard
      router.push("/admin/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">
        Admin Login
      </h1>

      <input
        placeholder="Email"
        className="border p-2 block mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-purple-600 text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
}
