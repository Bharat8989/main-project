"use client";

import { useState } from "react";
import { ID } from "appwrite";
import { databases, storage } from "@/lib/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

export default function UploadPaper() {
  const [form, setForm] = useState({
    department: "",
    year: "",
    semester: "",
    season: "",
    paperYear: "",
    subject: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const uploadPaper = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file.");

    try {
      setLoading(true);

      // 1) Upload file to Storage
      const uploaded = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      // 2) Save metadata to Database
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          department: form.department,           // enum: cse/entc/...
          year: Number(form.year),               // 1..4
          semester: Number(form.semester),       // 1..8
          season: form.season,                   // enum: winter/summer
          paperYear: Number(form.paperYear),     // e.g. 2015..2100
          subject: form.subject,
          fileId: uploaded.$id,                  // link to storage file
        }
      );

      alert("Paper uploaded successfully!");
      setForm({
        department: "",
        year: "",
        semester: "",
        season: "",
        paperYear: "",
        subject: "",
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console & IDs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Upload Question Paper</h1>

      <form onSubmit={uploadPaper} className="space-y-3">
        {/* Department (must match enum values in DB) */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Department</option>
          <option value="cse">Computer Science Engineering</option>
          <option value="entc">Electronics & Telecommunication Engineering</option>
          <option value="civil">Civil Engineering</option>
          <option value="ie">Information Engineering</option>
          <option value="mech">Mechanical Engineering</option>
          <option value="electrical">Electrical Engineering</option>
        </select>

        {/* Year 1..4 */}
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Year</option>
          {[1,2,3,4].map((y) => (
            <option key={y} value={y}>{y} Year</option>
          ))}
        </select>

        {/* Semester 1..8 */}
        <select
          name="semester"
          value={form.semester}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Semester</option>
          {[1,2,3,4,5,6,7,8].map((s) => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>

        {/* Season enum */}
        <select
          name="season"
          value={form.season}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Season</option>
          <option value="winter">Winter</option>
          <option value="summer">Summer</option>
        </select>

        {/* Paper Year */}
        <input
          name="paperYear"
          type="number"
          placeholder="Paper Year (e.g. 2015)"
          value={form.paperYear}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Subject */}
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* PDF File */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFile}
          className="border p-2 w-full"
          required
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Paper"}
        </button>
      </form>
    </div>
  );
}
