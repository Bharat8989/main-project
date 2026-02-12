import Link from "next/link";
import "./home.css";

const cards = [
  {
    title: "Computer Science (CSE)",
    desc: "Download semester-wise CSE previous year question papers (Winter & Summer) from 2020 onwards.",
    path: "/cse",
  },
  {
    title: "Electrical Engineering",
    desc: "Access Electrical Engineering previous year question papers by semester and exam season.",
    path: "/electrical",
  },
  {
    title: "Electronics & Telecommunication (ENTC)",
    desc: "Find ENTC previous year question papers for all semesters and exam sessions.",
    path: "/entc",
  },
  {
    title: "Civil Engineering",
    desc: "Download Civil Engineering semester-wise Winter & Summer exam question papers.",
    path: "/civil",
  },
  {
    title: "Instrumentation Engineering",
    desc: "Get Instrumentation Engineering previous year question papers organized by semester.",
    path: "/instrumentation",
  },
  {
    title: "Mechanical Engineering",
    desc: "Explore Mechanical Engineering previous year question papers from 2020 onwards.",
    path: "/mech",
  },
];

export default function Home() {
  return (
    <div className="home">
      <h1 className="page-title">PaperHub – Departments</h1>

      <div className="card-grid">
        {cards.map((card, index) => (
          
          // ✅ Entire Card Clickable
          <Link href={card.path} key={index} className="card-link">
            <div className="card">
              <div className="card__border"></div>

              <div className="card_title__container">
                <span className="card_title">{card.title}</span>
                <p className="card_paragraph">{card.desc}</p>
              </div>

              <hr className="line" />

              <span className="button">
                View Question Papers →
              </span>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}
