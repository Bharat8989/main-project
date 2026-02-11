import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "PaperHub-PYQ ",
  description:
    "Download Gondwana University previous year question papers, GCOEC Chandrapur BTech semester-wise exam papers, engineering PYQs and university exam papers.",

  keywords: [
    "Gondwana University previous year question papers",
    "GCOEC Chandrapur question papers",
    "Engineering PYQ Gondwana University",
    "Gondwana University exam papers",
    "Government College of Engineering Chandrapur papers",
    "BTech previous year papers Gondwana University",
    "Semester wise question papers GCOEC",
    "Gondwana University exam portal papers",
  ],

  icons: {
    icon: "./favicon.ico",
  },

  openGraph: {
    title: "Gondwana University PYQ Portal",
    description:
      "Semester-wise BTech previous year question papers of Gondwana University and GCOEC Chandrapur.",
    // url: "https://yourwebsite.com",
    siteName: "PaperHub-PYQ",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
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
