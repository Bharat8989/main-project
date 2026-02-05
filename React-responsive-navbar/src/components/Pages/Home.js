import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Computer Science (CSE)",
    desc: "Explore resources, guidelines and updates for CSE department.",
    path: "/cse",
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
    title: "Information Engineering (IE)",
    desc: "Access IE department academic and exam information.",
    path: "/ie",
  },
  {
    title: "Mechanical Engineering",
    desc: "Mechanical department notices and study material.",
    path: "/mech",
  },
  {
    title: "Electrical Engineering",
    desc: "Electrical department updates and support center.",
    path: "/electrical",
  },
];

const Home = () => {
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
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>

            <h5 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h5>

            <p className="text-gray-600 mb-4">{card.desc}</p>

            <Link
              to={card.path}
              className="inline-flex items-center font-medium text-purple-600 hover:underline"
            >
              Visit Department
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
