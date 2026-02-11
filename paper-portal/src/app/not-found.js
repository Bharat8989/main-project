import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#1f5156" }}>404</h1>

      <h2 style={{ marginBottom: "10px" }}>
        Page Not Found
      </h2>

      <p style={{ marginBottom: "20px", maxWidth: "500px" }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#f5b921",
          color: "#000",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
