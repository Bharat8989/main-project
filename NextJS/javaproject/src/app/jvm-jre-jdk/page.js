"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SidebarJava from "@/components/SidebarJava"

const JVMPage = () => {
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
            JVM, JRE, JDK
            </h1>
           {/* { img sections} */}
           <section className="mt-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-purple-300 mb-4">  </h3>
                <div className="w-full h-auto bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src="https://cwh-full-next-space.fra1.digitaloceanspaces.com/tutorial/java-jvm-jre-jdk/jvm_jdk.png"
                    alt="Features of Java"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* History Section */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">A. Java Virtual Machine (JVM):</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                <span className="font-semibold text-purple-300">Java Virtual Machine (JVM)</span>  is a core part of the Java Runtime Environment responsible for executing Java programs. It acts as an interpreter that converts Java bytecode into machine code that the CPU can understand.
                <br />
               
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">B. Java Runtime Environment (JRE):</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                <span className="font-semibold text-purple-300">Java Runtime Environment (JRE)</span> is a software package that contains everything needed to run Java applications, including the JVM, core libraries, and supporting files.
                <br />
               
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-4">C. Java Development Kit (JDK):</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                <span className="font-semibold text-purple-300">Java Development Kit (JDK)</span> is a superset of JRE that includes everything required for Java application development.
                <br />
               
              </p>
            </section>

            {/* Types of Java Applications Section */}
           

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

export default JVMPage

