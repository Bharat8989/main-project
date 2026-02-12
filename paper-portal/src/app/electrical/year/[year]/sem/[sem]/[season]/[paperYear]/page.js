import papers from "@/data/civil/papers.json";

export default async function PaperList({ params }) {
  const { year, sem, season, paperYear } = await params;

  const filtered = papers.filter(
    (p) =>
      p.department === "electrical" &&
      p.year === Number(year) &&
      p.semester === Number(sem) &&
      p.season.toLowerCase() === season.toLowerCase() &&
      p.paperYear === Number(paperYear)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Semester {sem} – {season.toUpperCase()} {paperYear}
        </h1>
        <p className="text-gray-600">
          Previous year question papers for Electrical department
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            ❌ No papers found for this selection.
          </div>
        )}

        <ul className="space-y-4">
          {filtered.map((paper, index) => (
            <li
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              {/* Subject */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  📘 {paper.subject}
                </h3>
                <p className="text-sm text-gray-500">
                  Semester {paper.semester} • {paper.season}
                </p>
              </div>

              {/* Action */}
              <a
                href={paper.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-full bg-purple-600 hover:bg-purple-700 transition"
              >
                Open PDF 📄
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
