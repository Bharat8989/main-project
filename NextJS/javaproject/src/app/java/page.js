"use client"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import SidebarJava from "../../components/SidebarJava"

const JavaPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-1 flex-col lg:flex-row container mx-auto px-4 lg:px-6 py-9 mt-16 lg:mt-20">
          {/* Sidebar - Hidden on mobile until toggled */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 lg:sticky">
            <SidebarJava />
          </aside>

          {/* Main Content - Takes full width on mobile */}
          <main className="w-full lg:w-3/4 xl:w-4/5 px-4 lg:px-8 py-8 lg:ml-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 animate-fade-in">
              Java Overview
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              Java is an open-source, class-based, high-level, and object-oriented programming language. It is
              platform-independent because Java programs are compiled into bytecode, which can run on any system with a
              Java Virtual Machine (JVM).
            </p>

            {/* History Section */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">History:</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                <span className="font-semibold text-purple-300">Creation:</span> Java was created by James Gosling in
                1995.
                <br />
                <span className="font-semibold text-purple-300">Original Purpose:</span> Initially, it was designed for
                the television industry.
                <br />
                <span className="font-semibold text-purple-300">Green Team:</span> Gosling worked with a team known as
                the Green Team, and their project was called Greentalk.
                <br />
                <span className="font-semibold text-purple-300">Name Change:</span> The project was later renamed OAK,
                after the oak tree outside Gosling's office. However, due to trademark issues with Oak Technologies, the
                name was changed to Java.
              </p>
            </section>

            {/* Types of Java Applications Section */}
            <section className="mt-8">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">
    Types of Java Applications:
  </h2>
  <p className="text-base text-gray-300 leading-relaxed mb-4">
    Java is used for developing a wide range of applications, including:
  </p>
  <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4">
    <li>
      <span className="font-semibold text-purple-300">Web Applications:</span> Run on web browsers using
      technologies like Servlet, JSP, and Struts. Deployed on servers to create dynamic web content.
    </li>
    <li>
      <span className="font-semibold text-purple-300">Mobile Applications:</span> Java is widely used for
      developing Android applications.
    </li>
    <li>
      <span className="font-semibold text-purple-300">Standalone Applications:</span> These are
      self-executing programs that do not require additional software. Examples include antivirus software
      and media players.
    </li>
    <li>
      <span className="font-semibold text-purple-300">Enterprise Applications:</span> Designed for
      large-scale organizations to manage complex processes in real-time. Examples include banking systems
      and ERP (Enterprise Resource Planning) software.
    </li>
  </ul>
</section>
            <section className="mt-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-300 mb-4"> Features </h3>
                <div className="w-full h-auto bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/36/93/0b/36930b109f31c369987fe9536eadb90d.jpg"
                    alt="Features of Java"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Key Features of Java Section */}
            <section className="mt-8">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">Key Features of Java:</h2>
  <ul className="list-decimal list-inside text-gray-300 space-y-4 pl-4">
    <li>
      <span className="text-lg font-semibold text-purple-300">Object-Oriented:</span>{" "}
      <span className="text-gray-300">
      Java follows the object-oriented programming paradigm, meaning everything is represented as objects, which enhances modularity and reusability.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Simple:</span>{" "}
      <span className="text-gray-300">Java has a clean and easy-to-understand syntax, making it simple to learn and use.</span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Distributed:</span>{" "}
      <span className="text-gray-300">
      Java supports distributed computing, allowing programs to run across multiple machines over a network.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Robust:</span>{" "}
      <span className="text-gray-300">
      Java is designed to handle errors efficiently, with strong exception handling, memory management, and garbage collection.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Secure:</span>{" "}
      <span className="text-gray-300">
      Java provides built-in security features such as bytecode verification, access control, and automatic memory management, reducing vulnerabilities.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">System Independence (Platform-Independent):</span>{" "}
      <span className="text-gray-300">
      Java code is compiled into bytecode, which can run on any device with a Java Virtual Machine (JVM).
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Portability:</span>{" "}
      <span className="text-gray-300">
      Java programs can be written once and executed anywhere, making them highly portable across different systems.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Interpreted:</span>{" "}
      <span className="text-gray-300">
      Java’s Just-In-Time (JIT) compiler improves execution speed by converting bytecode into native machine code during runtime.

      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">High Performance:</span>{" "}
      <span className="text-gray-300">
      Java is designed to handle errors efficiently, with strong exception handling, memory management, and garbage collection.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Multithreaded:</span>{" "}
      <span className="text-gray-300">
      Java supports concurrent execution of multiple threads, making it efficient for multitasking and parallel processing.
      </span>
    </li>
    <li>
      <span className="text-lg font-semibold text-purple-300">Dynamic:</span>{" "}
      <span className="text-gray-300">
      Java supports dynamic memory allocation and dynamic class loading, allowing it to adapt to changing environments at runtime.

      </span>
    </li>
    {/* <li>
      <span className="text-lg font-semibold text-purple-300">High Performance:</span>{" "}
      <span className="text-gray-300">
      Java is designed to handle errors efficiently, with strong exception handling, memory management, and garbage collection.
      </span>
    </li> */}
  </ul>
</section>

            {/* Image Placeholder for Key Features */}
           
          </main>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default JavaPage

