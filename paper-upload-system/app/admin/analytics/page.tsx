"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Users, FileText, Download } from "lucide-react";

export default function AdminAnalytics() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) {
      router.push("/admin");
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  const metrics = [
    {
      label: "Total Downloads",
      value: "2,856",
      change: "+12% this month",
      icon: Download,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Active Users",
      value: "1,245",
      change: "+8% this month",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Papers Uploaded",
      value: "156",
      change: "+23 this month",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Growth Rate",
      value: "18%",
      change: "+2% from last month",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  const departmentStats = [
    { dept: "CSE", papers: 48, downloads: 892, color: "bg-blue-100 text-blue-700" },
    { dept: "ENTC", papers: 42, downloads: 756, color: "bg-purple-100 text-purple-700" },
    { dept: "Civil", papers: 28, downloads: 412, color: "bg-amber-100 text-amber-700" },
    { dept: "IE", papers: 22, downloads: 356, color: "bg-green-100 text-green-700" },
    { dept: "Mechanical", papers: 10, downloads: 284, color: "bg-pink-100 text-pink-700" },
    { dept: "Electrical", papers: 6, downloads: 156, color: "bg-red-100 text-red-700" },
  ];

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">📊 Analytics & Reports</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-600 font-medium">{metric.label}</h3>
                  <div className={`p-3 bg-gradient-to-br ${metric.color} text-white rounded-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</p>
                <p className="text-sm text-green-600 font-medium">{metric.change}</p>
              </div>
            );
          })}
        </div>

        {/* Department Statistics */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Papers by Department</h2>

          <div className="space-y-4">
            {departmentStats.map((stat, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg font-semibold ${stat.color}`}>
                      {stat.dept}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{stat.papers} Papers</p>
                      <p className="text-sm text-slate-600">{stat.downloads} Downloads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{stat.downloads}</p>
                    <p className="text-xs text-slate-600">downloads</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${stat.color.split(" ")[0]} h-2 rounded-full transition-all`}
                    style={{ width: `${(stat.downloads / 892) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>

          <div className="space-y-3">
            {[
              { action: "Downloaded Data Structures Paper", time: "2 hours ago", type: "download" },
              { action: "Uploaded Circuit Theory Paper", time: "4 hours ago", type: "upload" },
              { action: "Deleted Old Paper (2015)", time: "1 day ago", type: "delete" },
              { action: "Downloaded Database Systems Paper", time: "2 days ago", type: "download" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {activity.type === "download" && "📥"}
                    {activity.type === "upload" && "📤"}
                    {activity.type === "delete" && "🗑️"}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
