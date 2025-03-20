// import { redirect } from "next/navigation";
// import { currentUser } from "@clerk/nextjs/server";
// import SignOutComponent from "../../components/SignOutComponent"; // Import the new component

// export default async function DashboardPage() {
//   const user = await currentUser();

//   if (!user) {
//     redirect("/login"); // Redirect to login if not signed in
//   }

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
//         {/* User Profile Section */}
//         <div className="flex items-center space-x-4">
//           <img
//             src={user?.imageUrl || "/default-avatar.png"}
//             alt="User Avatar"
//             className="w-16 h-16 rounded-full border"
//           />
//           <div>
//             <h1 className="text-2xl font-bold">
//               {user.firstName} {user.lastName}
//             </h1>
//             <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Profile Details</h2>
//           <p>
//             <strong>Email:</strong> {user.emailAddresses[0].emailAddress}
//           </p>
//           <p>
//             <strong>Phone:</strong> {user?.phoneNumbers?.[0]?.phoneNumber || "Not added"}
//           </p>
//         </div>

//         {/* Manage Account & Sign Out */}
//         <div className="mt-6 flex justify-between">
//           <a href="#" className="text-blue-500 hover:underline">
//             Manage Account
//           </a>
//           <SignOutComponent /> {/* Use the SignOutComponent */}
//         </div>
//       </div>
//     </main>
//   );
// }
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import Navbar from "../../components/Navbar"
import Home from "../../components/Home"
import Cards from "../../components/Cards"
import BannerImage from "../../components/Image"
import Explore from "../../components/Explore"
import Footer from "../../components/Footer"
import { SignOutButton } from "@clerk/nextjs"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
    return null // Stop execution
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-lg mx-auto w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            <img
              src={user?.imageUrl || "/placeholder.svg?height=64&width=64"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                {user?.firstName ?? "User"} {user?.lastName ?? ""}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.emailAddresses?.[0]?.emailAddress ?? "No email"}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold dark:text-white">Profile Details</h2>
            <p className="dark:text-gray-300">
              <strong>Email:</strong> {user?.emailAddresses?.[0]?.emailAddress ?? "No email"}
            </p>
          </div>

          {/* Manage Account & Sign Out */}
          <div className="mt-6 flex justify-between">
            <a href="#" className="text-blue-500 hover:underline">
              Manage Account
            </a>
            <SignOutButton className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              Sign Out
            </SignOutButton>
          </div>
        </div>

        {/* <Home />
        <Cards />
        <BannerImage />
        <Explore /> */}
      </main>
      <Footer />
    </div>
  )
}

