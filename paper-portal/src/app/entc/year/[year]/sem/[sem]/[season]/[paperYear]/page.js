import papers from "@/data/papers.json";

export default async function PaperList({ params }) {

  const { year, sem, season, paperYear } = await params;

  const filtered = papers.filter(
    (p) =>
      p.department === "entc" &&
      p.year === Number(year) &&
      p.semester === Number(sem) &&
      p.season.toLowerCase() === season.toLowerCase() &&
      p.paperYear === Number(paperYear)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        Semester {sem} – {season.toUpperCase()} {paperYear}
      </h1>

      {filtered.length === 0 && (
        <p className="text-gray-500">No papers found.</p>
      )}

      <ul className="space-y-3">
        {filtered.map((paper, index) => (
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
}
