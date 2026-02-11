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
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const uploadPaper = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    try {
      setLoading(true);

      // 1️⃣ Upload file (permissions handled by bucket)
      const uploaded = await storage.createFile(
  BUCKET_ID,
  ID.unique(),
  file
);

await databases.createDocument(
  DATABASE_ID,
  COLLECTION_ID,
  ID.unique(),
  {
    department: form.department,
    year: Number(form.year),
    semester: Number(form.semester),
    season: form.season,
    paperYear: Number(form.paperYear),
    subject: form.subject,
    fileId: uploaded.$id,
  }
);


      alert("Paper uploaded successfully ✅");

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
      console.error("UPLOAD ERROR:", err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Upload Question Paper</h1>

      <form onSubmit={uploadPaper} className="space-y-3">
        <select name="department" value={form.department} onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ENTC">ENTC</option>
          <option value="Civil">Civil</option>
          <option value="IE">IE</option>
          <option value="Mech">Mechanical</option>
          <option value="Electrical">Electrical</option>
        </select>

        <select name="year" value={form.year} onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Year</option>
          {[1, 2, 3, 4].map(y => (
            <option key={y} value={y}>{y} Year</option>
          ))}
        </select>

        <select name="semester" value={form.semester} onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Semester</option>
          {[1,2,3,4,5,6,7,8].map(s => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>

        <select name="season" value={form.season} onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Season</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
        </select>

        <input
          type="number"
          name="paperYear"
          value={form.paperYear}
          onChange={handleChange}
          placeholder="Paper Year"
          required
          className="border p-2 w-full"
        />

        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="border p-2 w-full"
        />

        <button
          disabled={loading || !file}
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Paper"}
        </button>
      </form>
    </div>
  );
}
