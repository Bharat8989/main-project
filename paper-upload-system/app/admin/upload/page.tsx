"use client";

import React from "react"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, FileText, ArrowLeft } from "lucide-react";

export default function UploadPaper() {
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

  const [form, setForm] = useState({
    department: "",
    year: "",
    semester: "",
    season: "",
    paperYear: new Date().getFullYear().toString(),
    subject: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    setLoading(true);
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Paper uploaded:", {
        ...form,
        fileName: file.name,
      });

      setSuccess(true);
      setForm({
        department: "",
        year: "",
        semester: "",
        season: "",
        paperYear: new Date().getFullYear().toString(),
        subject: "",
      });
      setFile(null);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-green-900">Paper uploaded successfully!</p>
              <p className="text-sm text-green-700">Your paper has been added to the database.</p>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Upload Question Paper</h1>
              <p className="text-slate-600">Add a new paper to the portal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department *
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science Engineering (CSE)</option>
                <option value="ENTC">Electronics & Telecom (ENTC)</option>
                <option value="Civil">Civil Engineering</option>
                <option value="IE">Information Engineering (IE)</option>
                <option value="Mech">Mechanical Engineering</option>
                <option value="Electrical">Electrical Engineering</option>
              </select>
            </div>

            {/* Year & Semester Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Year *
                </label>
                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map((y) => (
                    <option key={y} value={y}>
                      {y}st/nd/rd/th Year
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Semester *
                </label>
                <select
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Season & Paper Year Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Season *
                </label>
                <select
                  name="season"
                  value={form.season}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select Season</option>
                  <option value="Winter">❄️ Winter</option>
                  <option value="Summer">☀️ Summer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Paper Year *
                </label>
                <input
                  type="number"
                  name="paperYear"
                  value={form.paperYear}
                  onChange={handleChange}
                  min="2015"
                  max={new Date().getFullYear()}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject Name *
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g., Data Structures, Digital Electronics"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                PDF File *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFile}
                  required
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:border-green-400 transition cursor-pointer"
                />
                {file && (
                  <div className="mt-2 flex items-center gap-2 text-green-700">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Paper
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
