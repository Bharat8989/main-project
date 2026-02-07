import Link from "next/link";

const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

const ieData = [
  { year: "1st Year", semesters: ["Semester 1", "Semester 2"] },
  { year: "2nd Year", semesters: ["Semester 3", "Semester 4"] },
  { year: "3rd Year", semesters: ["Semester 5", "Semester 6"] },
  { year: "4th Year", semesters: ["Semester 7", "Semester 8"] },
];

export default function IE() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-10">
        Instrumentation Engineering Department – Question Papers
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {ieData.map((yearBlock, yearIndex) => (
          <div key={yearIndex} className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">
              {yearBlock.year}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {yearBlock.semesters.map((sem, semIndex) => {
                const actualSem = yearIndex * 2 + semIndex + 1;

                return (
                  <div key={semIndex} className="border p-4 rounded">
                    <h3 className="font-semibold mb-3">{sem}</h3>

                    {/* Winter */}
                    <p className="font-medium mb-1">Winter</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {years.map((yr) => (
                        <Link
                          key={`w-${yr}`}
                          href={`/ie/year/${yearIndex + 1}/sem/${actualSem}/winter/${yr}`}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          {yr}
                        </Link>
                      ))}
                    </div>

                    {/* Summer */}
                    <p className="font-medium mb-1">Summer</p>
                    <div className="flex flex-wrap gap-2">
                      {years.map((yr) => (
                        <Link
                          key={`s-${yr}`}
                          href={`/ie/year/${yearIndex + 1}/sem/${actualSem}/summer/${yr}`}
                          className="px-3 py-1 bg-green-100 rounded hover:bg-green-200"
                        >
                          {yr}
                        </Link>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
