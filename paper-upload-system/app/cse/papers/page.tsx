"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, FileText, Filter } from "lucide-react";

// Mock data - In production, fetch from database
const mockPapers = [
  {
    id: 1,
    subject: "Data Structures",
    department: "CSE",
    year: 1,
    semester: 1,
    season: "Winter",
    paperYear: 2025,
    fileId: "file-1",
    url: "https://example.com/ds-2025-w.pdf",
  },
  {
    id: 2,
    subject: "Programming in C",
    department: "CSE",
    year: 1,
    semester: 1,
    season: "Winter",
    paperYear: 2024,
    fileId: "file-2",
    url: "https://example.com/c-2024-w.pdf",
  },
  {
    id: 3,
    subject: "Data Structures",
    department: "CSE",
    year: 1,
    semester: 1,
    season: "Summer",
    paperYear: 2025,
    fileId: "file-3",
    url: "https://example.com/ds-2025-s.pdf",
  },
];

export default function PapersPage() {
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const semester = searchParams.get("sem");
  const season = searchParams.get("season");
  const paperYear = searchParams.get("paperYear");

  const [filteredPapers] = useState(() => {
    return mockPapers.filter(
      (p) =>
        (!year || p.year === parseInt(year)) &&
        (!semester || p.semester === parseInt(semester)) &&
        (!season || p.season === season) &&
        (!paperYear || p.paperYear === parseInt(paperYear))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/cse" className="hover:text-blue-600">
            CSE
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Papers</span>
        </div>

        {/* Filter Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-900">
              Filter Results
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {year && (
              <div>
                <p className="text-slate-600">Year</p>
                <p className="font-semibold text-slate-900">{year}st/nd/rd/th Year</p>
              </div>
            )}
            {semester && (
              <div>
                <p className="text-slate-600">Semester</p>
                <p className="font-semibold text-slate-900">Semester {semester}</p>
              </div>
            )}
            {season && (
              <div>
                <p className="text-slate-600">Season</p>
                <p className="font-semibold text-slate-900">{season}</p>
              </div>
            )}
            {paperYear && (
              <div>
                <p className="text-slate-600">Paper Year</p>
                <p className="font-semibold text-slate-900">{paperYear}</p>
              </div>
            )}
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-4">
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5 border-l-4 border-blue-600"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        {paper.subject}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-600">
                      <p>📚 Year {paper.year}</p>
                      <p>📖 Semester {paper.semester}</p>
                      <p>📅 {paper.season}</p>
                      <p>📆 {paper.paperYear}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No papers found matching your filters</p>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria</p>
              <Link
                href="/cse"
                className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Back to CSE
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
