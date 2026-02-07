import Link from "next/link";

const years = Array.from({ length: 12 }, (_, i) => 2015 + i);

const mechData = [
  { year: "1st Year", semesters: ["Semester 1", "Semester 2"] },
  { year: "2nd Year", semesters: ["Semester 3", "Semester 4"] },
  { year: "3rd Year", semesters: ["Semester 5", "Semester 6"] },
  { year: "4th Year", semesters: ["Semester 7", "Semester 8"] },
];

export default function Mech() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            ⚙️ Mechanical Engineering – Question Papers
          </h1>
          <p className="text-slate-600">Browse Mechanical Engineering papers by year and semester</p>
        </div>

        <div className="space-y-8">
          {mechData.map((yearBlock, yearIndex) => (
            <div key={yearIndex} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">
                {yearBlock.year}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {yearBlock.semesters.map((sem, semIndex) => {
                  const actualSem = yearIndex * 2 + semIndex + 1;

                  return (
                    <div key={semIndex} className="border border-slate-200 p-5 rounded-lg">
                      <h3 className="font-semibold mb-4 text-slate-900 text-lg">
                        {sem}
                      </h3>

                      {/* Winter */}
                      <div className="mb-5">
                        <p className="font-medium mb-3 text-blue-600 flex items-center gap-2">
                          ❄️ Winter
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {years.map((yr) => (
                            <Link
                              key={`w-${yr}`}
                              href={`/mech/papers?year=${yearIndex + 1}&sem=${actualSem}&season=Winter&paperYear=${yr}`}
                              className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 hover:shadow-md transition text-sm font-medium"
                            >
                              {yr}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Summer */}
                      <div>
                        <p className="font-medium mb-3 text-green-600 flex items-center gap-2">
                          ☀️ Summer
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {years.map((yr) => (
                            <Link
                              key={`s-${yr}`}
                              href={`/mech/papers?year=${yearIndex + 1}&sem=${actualSem}&season=Summer&paperYear=${yr}`}
                              className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 hover:shadow-md transition text-sm font-medium"
                            >
                              {yr}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
