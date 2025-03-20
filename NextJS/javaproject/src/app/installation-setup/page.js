"use client"
"use client"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import SidebarJava from "../../components/SidebarJava"

const InstallationSetupPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
        <div className="flex flex-1 flex-col lg:flex-row container mx-auto px-4 lg:px-6 py-9 mt-16 lg:mt-20">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 lg:sticky">
            <SidebarJava />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 xl:w-4/5 px-4 lg:px-8 py-8 lg:ml-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 animate-fade-in">
              Installation & Setup
            </h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow">
              <h2 className="text-2xl font-bold text-white mb-4">Step 1: Check Java Installation</h2>
              <p>Open the command prompt and type:</p>
              <code className="block bg-black text-green-400 p-4 rounded-md mt-2 font-mono">java -version</code>
              <p className="mt-2">If Java is installed, you should see an output similar to:</p>
              <pre className="bg-black text-green-400 p-4 rounded-md mt-2 overflow-x-auto font-mono">
                java version "1.8.0_281" <br></br>
                Java(TM) SE Runtime Environment (build 1.8.0_281-b09) <br></br>
                Java HotSpot(TM) 64-Bit Server VM (build 25.281-b09, mixed mode)
              </pre>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow mt-6">
              <h2 className="text-2xl font-bold text-white mb-4">Step 2: Download Java</h2>
              <p>If Java is not installed, download it from the official website:</p>
              <a
                href="https://www.oracle.com/java/technologies/downloads/"
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Java
              </a>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow mt-6">
              <h2 className="text-2xl font-bold text-white mb-4">Step 3: Install Java</h2>
              <p>Run the downloaded file and follow the installation wizard to install Java on your system.</p>
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Installation Tips:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Accept the license agreement</li>
                  <li>Choose the installation directory (default is recommended)</li>
                  <li>Wait for the installation to complete</li>
                  <li>Click "Close" when finished</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow mt-6">
              <h2 className="text-2xl font-bold text-white mb-4">Step 4: Configure Environment Variables</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Windows:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Right-click on 'This PC' and go to Properties</li>
                    <li>Go to Advanced System Settings</li>
                    <li>Under 'System Properties', click on Environment Variables</li>
                    <li>Inside 'System Variables', find 'Path' and click Edit</li>
                    <li>Add the path of the Java \bin directory</li>
                    <li>Click OK and restart your terminal</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">Mac/Linux:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Open Terminal</li>
                    <li>Edit your profile file (.bash_profile, .zshrc, etc.)</li>
                    <li>Add: export JAVA_HOME=/path/to/java</li>
                    <li>Add: export PATH=$PATH:$JAVA_HOME/bin</li>
                    <li>Save the file and run: source ~/.bash_profile</li>
                    <li>Verify with: echo $JAVA_HOME</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-purple-500/10 transition-shadow mt-6">
              <h2 className="text-2xl font-bold text-white mb-4">Step 5: Verify Installation</h2>
              <p>After completing all steps, verify your installation:</p>
              <code className="block bg-black text-green-400 p-4 rounded-md mt-2 font-mono">
                java -version
                <br />
                javac -version
              </code>
              <p className="mt-4">
                Both commands should display version information. If they do, congratulations! Java is successfully
                installed on your system.
              </p>
            </div>
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

export default InstallationSetupPage

