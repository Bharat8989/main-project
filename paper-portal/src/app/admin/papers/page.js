"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

export default function AdminPapers() {

  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semester: "",
    search: ""
  });

  // Fetch Papers
  const fetchPapers = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );

      setPapers(res.documents);
      setFilteredPapers(res.documents);

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Paper
  const deletePaper = async (id) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    fetchPapers();
  };

  // Handle Filter Change
  const handleFilter = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };

    setFilters(newFilters);

    const result = papers.filter((paper) => {

      return (
        (!newFilters.department ||
          paper.department === newFilters.department) &&

        (!newFilters.year ||
          paper.year === Number(newFilters.year)) &&

        (!newFilters.semester ||
          paper.semester === Number(newFilters.semester)) &&

        (!newFilters.search ||
          paper.subject
            .toLowerCase()
            .includes(newFilters.search.toLowerCase()))
      );

    });

    setFilteredPapers(result);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Manage Question Papers
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-3 mb-6">

        <select
          name="department"
          onChange={handleFilter}
          className="border p-2"
        >
          <option value="">All Departments</option>
          <option value="cse">CSE</option>
          <option value="entc">ENTC</option>
        </select>

        <select
          name="year"
          onChange={handleFilter}
          className="border p-2"
        >
          <option value="">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <select
          name="semester"
          onChange={handleFilter}
          className="border p-2"
        >
          <option value="">All Semester</option>
          {[1,2,3,4,5,6,7,8].map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>

        <input
          name="search"
          placeholder="Search Subject"
          onChange={handleFilter}
          className="border p-2"
        />

      </div>

      {/* Paper List */}
      <div className="space-y-3">

        {filteredPapers.map((paper) => (
          <div
            key={paper.$id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <p className="font-semibold">
                {paper.subject}
              </p>

              <p className="text-sm text-gray-500">
                {paper.department.toUpperCase()} |
                Year {paper.year} |
                Sem {paper.semester}
              </p>
            </div>

            <button
              onClick={() => deletePaper(paper.$id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}
