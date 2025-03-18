"use client";
import { useState } from "react"; // ✅ Import useState
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SidebarJava from "@/components/SidebarJava";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard } from "lucide-react"; // ✅ Copy icon

// 🔹 Reusable Code Block Component with Copy Button
const CodeSnippet = ({ title, fileName, code, output }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow mt-6 relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-26 right-6 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600 transition"
      >
        {copied ? "✅ Copied!" : <Clipboard size={16} />}
      </button>

      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-2">File Name: {fileName}</p>

      <SyntaxHighlighter language="java" style={dracula} className="rounded-md">
        {code}
      </SyntaxHighlighter>

      <pre className="bg-black text-red-400 p-4 rounded-md mt-2 font-mono">
        {output}
      </pre>
    </div>
  );
};

const InstallationSetupPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-1 flex-col lg:flex-row container mx-auto px-4 lg:px-6 py-9 mt-16 lg:mt-20">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <SidebarJava />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 xl:w-4/5 px-4 lg:px-8 py-8 lg:ml-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 animate-fade-in">
              Basics of Java Syntax
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              It is particularly important to follow the appropriate syntax while writing Java code,
              as we might get errors for the slightest mistake in our code.
            </p>

            {/* Importance of Syntax */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">
                1. Importance of Following Java Syntax
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-200">
                <li>Every statement must follow proper syntax.</li>
                <li>
                  Errors occur even for minor mistakes like missing semicolons (;), incorrect capitalization, or misplaced brackets ({} & ).
                </li>
              </ul>
            </section>

            {/* Class Name Matching File Name */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">
                2. Class Name Must Match the File Name
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-200">
                <li>
                  The file name must be the same as the
                  <span className="bg-indigo-950 rounded-lg px-2 mx-1">public class</span> name.
                </li>
                <li>If the file name and class name differ, compilation will fail.</li>
              </ul>
            </section>

            {/* Code Examples */}
            <CodeSnippet
              title="Example: Incorrect (Error)"
              fileName="Details.java"
              code={`package syntax1;

public class DEtails {  // ❌ Error: Class name does not match file name (case-sensitive)
    public static void main(String[] args) {
        System.out.println("Java program with different file and class names");
    }
}`}
              output={`// Output:
The public type DEtails must be defined in its own file.`}
            />

            <CodeSnippet
              title="Example: Correct"
              fileName="Details.java"
              code={`package syntax1;

public class Details {  // ✅ Correct: Class name matches file name
    public static void main(String[] args) {
        System.out.println("Java program with the correct file and class names");
    }
}`}
              output={`// Output:
Java program with the correct file and class names.`}
            />
          </main>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default InstallationSetupPage;
