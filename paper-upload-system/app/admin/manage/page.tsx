"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Edit2, ArrowLeft, Filter, Search } from "lucide-react";

interface Paper {
  id: number;
  subject: string;
  department: string;
  year: number;
  semester: number;
  season: string;
  paperYear: number;
}

export default function ManagePapers() {
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

  const [papers, setPapers] = useState<Paper[]>([
    {
      id: 1,
      subject: "Data Structures",
      department: "CSE",
      year: 1,
      semester: 1,
      season: "Winter",
      paperYear: 2025,
    },
    {
      id: 2,
      subject: "Digital Electronics",
      department: "ENTC",
      year: 1,
      semester: 1,
      season: "Winter",
      paperYear: 2025,
    },
    {
      id: 3,
      subject: "Database Management",
      department: "CSE",
      year: 2,
      semester: 3,
      season: "Summer",
      paperYear: 2025,
    },
  ]);

  const [filteredPapers, setFilteredPapers] = useState(papers);
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    search: "",
  });

  const handleFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const filtered = papers.filter(
      (p) =>
        (!newFilters.department || p.department === newFilters.department) &&
        (!newFilters.year || p.year === parseInt(newFilters.year)) &&
        (!newFilters.search ||
          p.subject.toLowerCase().includes(newFilters.search.toLowerCase()))
    );
    setFilteredPapers(filtered);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this paper?")) {
      setPapers(papers.filter((p) => p.id !== id));
      handleFilter("search", filters.search);
    }
  };

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          📋 Manage Question Papers
        </h1>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <select
                value={filters.department}
                onChange={(e) => handleFilter("department", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="ENTC">ENTC</option>
                <option value="Civil">Civil</option>
                <option value="IE">IE</option>
                <option value="Mech">Mechanical</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilter("year", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search Subject
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) => handleFilter("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Papers Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Season
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <tr
                      key={paper.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {paper.subject}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {paper.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        Year {paper.year} | Sem {paper.semester}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            paper.season === "Winter"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {paper.season} {paper.paperYear}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(paper.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-600">
                      No papers found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium">
            Total Papers: {filteredPapers.length} of {papers.length}
          </p>
        </div>
      </div>
    </div>
  );
}
