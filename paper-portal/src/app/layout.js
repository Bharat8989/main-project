import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "My App",
  description: "Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
