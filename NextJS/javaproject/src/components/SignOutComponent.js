"use client";
import { SignOutButton } from "@clerk/nextjs";

export default function SignOutComponent() {
  return (
    <SignOutButton>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Sign Out
      </button>
    </SignOutButton>
  );
}
