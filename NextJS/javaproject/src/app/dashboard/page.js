import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import SignOutComponent from "../../components/SignOutComponent"; // Import the new component

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login"); // Redirect to login if not signed in
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <img
            src={user?.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Profile Details</h2>
          <p>
            <strong>Email:</strong> {user.emailAddresses[0].emailAddress}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phoneNumbers?.[0]?.phoneNumber || "Not added"}
          </p>
        </div>

        {/* Manage Account & Sign Out */}
        <div className="mt-6 flex justify-between">
          <a href="#" className="text-blue-500 hover:underline">
            Manage Account
          </a>
          <SignOutComponent /> {/* Use the SignOutComponent */}
        </div>
      </div>
    </main>
  );
}
