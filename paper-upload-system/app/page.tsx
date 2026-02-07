import Link from "next/link";
import { BookOpen, Award, Users, TrendingUp } from "lucide-react";

const departments = [
  {
    id: "cse",
    title: "Computer Science (CSE)",
    desc: "Explore question papers, notes and resources for Computer Science Engineering.",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "entc",
    title: "Electronics & Telecom (ENTC)",
    desc: "Access Electronics & Telecommunication Engineering study materials.",
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "civil",
    title: "Civil Engineering",
    desc: "Civil Engineering question papers and academic resources.",
    icon: "🏗️",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "ie",
    title: "Information Engineering (IE)",
    desc: "Information Engineering department materials and papers.",
    icon: "📊",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "mech",
    title: "Mechanical Engineering",
    desc: "Mechanical Engineering question papers and study guides.",
    icon: "⚙️",
    color: "from-red-500 to-rose-500",
  },
  {
    id: "electrical",
    title: "Electrical Engineering",
    desc: "Electrical Engineering resources and examination papers.",
    icon: "🔌",
    color: "from-yellow-500 to-amber-500",
  },
];

const stats = [
  { icon: BookOpen, label: "Papers", value: "500+" },
  { icon: Award, label: "Departments", value: "6" },
  { icon: Users, label: "Students", value: "10K+" },
  { icon: TrendingUp, label: "Years", value: "2015-2026" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            📚 Paper Portal
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Your comprehensive repository for university question papers and academic resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#departments"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Browse Departments
            </Link>
            <Link
              href="/admin"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center p-4">
                <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            All Departments
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                href={`/${dept.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                <div className="p-6">
                  <div className="text-4xl mb-3">{dept.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {dept.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{dept.desc}</p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition">
                    Browse Papers →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="font-semibold mb-2">Organized Structure</h3>
              <p className="text-slate-300">Browse papers by department, year, semester, and season</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold mb-2">Easy Search</h3>
              <p className="text-slate-300">Filter papers by year and semester for quick access</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-semibold mb-2">Admin Control</h3>
              <p className="text-slate-300">Upload, edit, and manage papers easily</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
