import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaperList = () => {
  const { year, sem, season, paperYear } = useParams();
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetch("/data/papers.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) =>
            p.department === "cse" &&
            p.year === Number(year) &&
            p.semester === Number(sem) &&
            p.season === season &&
            p.paperYear === Number(paperYear)
        );
        setPapers(filtered);
      });
  }, [year, sem, season, paperYear]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        Semester {sem} – {season.toUpperCase()} {paperYear}
      </h1>

      {papers.length === 0 && (
        <p className="text-gray-500">No papers found.</p>
      )}

      <ul className="space-y-3">
        {papers.map((paper, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <span>{paper.subject}</span>
            <a
              href={paper.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 font-semibold"
            >
              Open PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaperList;
