"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Settings, LogOut, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const stats = [
    { label: "Total Papers", value: "156", icon: "📄", color: "from-blue-500 to-cyan-500" },
    { label: "Departments", value: "6", icon: "🏢", color: "from-purple-500 to-pink-500" },
    { label: "This Month", value: "12", icon: "📈", color: "from-green-500 to-teal-500" },
    { label: "Users", value: "1.2K", icon: "👥", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">📊 Admin Dashboard</h1>
            <p className="text-slate-600 text-sm">Paper Portal Management System</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 font-medium">{stat.label}</h3>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upload Paper Card */}
          <Link
            href="/admin/upload"
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Upload Paper</h3>
                <p className="text-green-100">Add new question papers to the database</p>
              </div>
            </div>
          </Link>

          {/* Manage Papers Card */}
          <Link
            href="/admin/manage"
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition">
                <Settings className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Manage Papers</h3>
                <p className="text-blue-100">Edit, delete, and organize papers</p>
              </div>
            </div>
          </Link>

          {/* Analytics Card */}
          <Link
            href="/admin/analytics"
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Analytics</h3>
                <p className="text-purple-100">View usage statistics and reports</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div>
                <p className="font-medium text-slate-900">Data Structures Paper Uploaded</p>
                <p className="text-sm text-slate-600">CSE Department - Today at 2:30 PM</p>
              </div>
              <span className="text-green-600 font-medium">✓ Completed</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div>
                <p className="font-medium text-slate-900">Database Updated</p>
                <p className="text-sm text-slate-600">ENTC Department - Yesterday</p>
              </div>
              <span className="text-blue-600 font-medium">→ In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
