"use client"

import { SignUp } from "@clerk/nextjs"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 pt-20">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Sign Up</h1>
          <SignUp
            routing="path"
            path="/signup"
            signInUrl="/login"
            afterSignUpUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
                socialButtonsBlockButton:
                  "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
                card: "dark:bg-gray-800",
                headerTitle: "dark:text-white",
                headerSubtitle: "dark:text-gray-300",
                formFieldLabel: "dark:text-gray-300",
                formFieldInput: "dark:bg-gray-700 dark:text-white dark:border-gray-600",
              },
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

