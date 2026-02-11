import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex gap-4 mt-5">

        <Link
          href="/admin/upload"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Upload Paper
        </Link>

        <Link
          href="/admin/papers"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Manage Papers
        </Link>

      </div>

    </div>
  );
}
