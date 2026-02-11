export const metadata = {
  title: "About PaperHub | Gondwana University PYQ",
  description:
    "Learn more about PaperHub, a platform for Gondwana University previous year question papers and GCOEC Chandrapur exam resources.",
};

export default function AboutPage() {
  return (
    <section style={{ padding: "60px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#1f5156" }}>
        About PaperHub
      </h1>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "20px" }}>
        <strong>PaperHub</strong> is a dedicated platform created to help
        engineering students of <strong>Gondwana University</strong> access
        previous year question papers easily and quickly.
      </p>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "20px" }}>
        We focus mainly on students of{" "}
        <strong>Government College of Engineering, Chandrapur (GCOEC)</strong>,
        providing semester-wise and branch-wise question papers to support
        exam preparation.
      </p>

      <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        Our goal is to save students time, reduce stress before exams, and make
        study resources accessible to everyone in a clean and user-friendly
        way.
      </p>
    </section>
  );
}
