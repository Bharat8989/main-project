import Link from "next/link";
// import '../app/app.css'

const cards = [
  {
    title: "Computer Science (CSE)",
    desc: "Explore resources, guidelines and updates for CSE department.",
    path: "/cse",
  },
  {
    title: "Electrical Engineering",
    desc: "Electrical department updates and support center.",
    path: "/electrical",
  },
  {
    title: "Electronics & Telecom (ENTC)",
    desc: "All ENTC department related information in one place.",
    path: "/entc",
  },
  {
    title: "Civil Engineering",
    desc: "Guidelines, updates and civil department resources.",
    path: "/civil",
  },
  {
    title: "Instrumentation Engineering (IE)",
    desc: "Access IE department academic and exam information.",
    path: "/ie",
  },
  {
    title: "Mechanical Engineering",
    desc: "Mechanical department notices and study material.",
    path: "/mech",
  },
  
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Departments
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
          >
            <h5 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h5>

            <p className="text-gray-600 mb-4">{card.desc}</p>

            <Link
              href={card.path}
              className="inline-flex items-center font-medium text-purple-600 hover:underline"
            >
              Visit Department →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
