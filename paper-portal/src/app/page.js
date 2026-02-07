import Link from "next/link";
import "./home.css";

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
    <div className="home">
      <h1 className="page-title">Departments</h1>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card__border"></div>

            <div className="card_title__container">
              <span className="card_title">{card.title}</span>
              <p className="card_paragraph">{card.desc}</p>
            </div>

            <hr className="line" />

            <Link href={card.path} className="button">
              Visit Department →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
