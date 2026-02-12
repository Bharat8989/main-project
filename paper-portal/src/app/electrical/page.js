import Link from "next/link";

/* ============================= */
/* ✅ SEO METADATA */
/* ============================= */

export const metadata = {
  title: "Electrical Engineering Question Papers | PYQ",
  description:
    "Download Electrical Engineering previous year question papers of Gondwana University. Access semester-wise Winter and Summer exam papers from 2020 onwards.",

  keywords: [
    "Electrical Engineering previous year question papers",
    "Electrical Engineering PYQ",
    "Gondwana University Electrical papers",
    "Electrical semester wise question papers",
    "Electrical winter summer exam papers",
    "Engineering PYQ Electrical Gondwana University",
  ],

  openGraph: {
    title: "Electrical Engineering Question Papers | PaperHub",
    description:
      "Semester-wise Electrical Engineering previous year question papers of Gondwana University.",
    siteName: "PaperHub",
    type: "website",
    locale: "en_IN",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ============================= */
/* ✅ DATA */
/* ============================= */

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

const electricalData = [
  { year: "1st Year", semesters: ["Semester 1", "Semester 2"] },
  { year: "2nd Year", semesters: ["Semester 3", "Semester 4"] },
  { year: "3rd Year", semesters: ["Semester 5", "Semester 6"] },
  { year: "4th Year", semesters: ["Semester 7", "Semester 8"] },
];

/* ============================= */
/* ✅ COMPONENT */
/* ============================= */

export default function Electrical() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Electrical Engineering – Question Papers
      </h1>

      <div className="max-w-6xl mx-auto space-y-10">
        {electricalData.map((yearBlock, yearIndex) => (
          <div
            key={yearIndex}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
          >
            {/* Year Title */}
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
              🎓 {yearBlock.year}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {yearBlock.semesters.map((sem, semIndex) => {
                const actualSem = yearIndex * 2 + semIndex + 1;

                return (
                  <div
                    key={semIndex}
                    className="border rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    {/* Semester */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      📘 {sem}
                    </h3>

                    {/* Winter Section */}
                    <p className="font-medium text-gray-600 mb-2">
                      ❄️ Winter
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {years.map((yr) => (
                        <Link
                          key={`w-${yr}`}
                          href={`/electrical/year/${yearIndex + 1}/sem/${actualSem}/winter/${yr}`}
                          className="px-3 py-1 text-lg font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition"
                        >
                          {yr}
                        </Link>
                      ))}
                    </div>

                    {/* Summer Section */}
                    <p className="font-medium text-gray-600 mb-2">
                      ☀️ Summer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {years.map((yr) => (
                        <Link
                          key={`s-${yr}`}
                          href={`/electrical/year/${yearIndex + 1}/sem/${actualSem}/summer/${yr}`}
                          className="px-3 py-1 text-lg font-medium bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition"
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
