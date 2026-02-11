"use client";

import { useState } from "react";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

export default function AdminForm() {

  const [form, setForm] = useState({
    department: "",
    year: "",
    semester: "",
    season: "",
    paperYear: "",
    subject: "",
    file: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...form,
          year: Number(form.year),
          semester: Number(form.semester),
          paperYear: Number(form.paperYear)
        }
      );

      alert("Paper Uploaded");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-3">

      <input name="department" placeholder="Department" onChange={handleChange} className="border p-2 w-full" />

      <input name="year" placeholder="Year" onChange={handleChange} className="border p-2 w-full" />

      <input name="semester" placeholder="Semester" onChange={handleChange} className="border p-2 w-full" />

      <input name="season" placeholder="Season" onChange={handleChange} className="border p-2 w-full" />

      <input name="paperYear" placeholder="Paper Year" onChange={handleChange} className="border p-2 w-full" />

      <input name="subject" placeholder="Subject" onChange={handleChange} className="border p-2 w-full" />

      <input name="file" placeholder="PDF URL" onChange={handleChange} className="border p-2 w-full" />

      <button className="bg-purple-600 text-white px-4 py-2 rounded">
        Upload Paper
      </button>

    </form>
  );
}
