"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa"

const SidebarJava = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    variables: true,
    conditional: true
  })

  // Check if we're on mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto-close sidebar on small screens
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close sidebar when clicking a link on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const sections = [
    {
      id: "introduction",
      title: "INTRODUCTION",
      pages: [
        { path: "/java", label: "Java Overview" },
        { path: "/installation-setup", label: "Installation & Setup" },
        { path: "/jvm-jre-jdk", label: "JVM, JRE, JDK" },
        { path: "/basic-java-syntax", label: "Basic Java Syntax" },
        { path: "/java-comments", label: "Java Comments" },
        { path: "/java-data-types", label: "Java Data Types" },
      ]
    },
    {
      id: "variables",
      title: "VARIABLES, OPERATORS & I/O",
      pages: [
        { path: "/java-variables", label: "Java Variables" },
        { path: "/java-operators", label: "Java Operators" },
        { path: "/user-input-output", label: "User Input/Output" },
      ]
    },
    {
      id: "conditional",
      title: "CONDITIONAL STATEMENTS",
      pages: [
        { path: "/if-statement", label: "If Statement" },
        { path: "/nested-if", label: "Nested If Statements" },
        { path: "/switch-case", label: "Switch Case Statements" },
      ]
    }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="relative">
      {/* Toggle Button for Small Screens */}
      <button
        className="fixed top-20 left-4 z-50 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 lg:hidden"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out z-40 shadow-xl ${
          isSidebarOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]`}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#6366f1 #1f2937' }}
      > 
        <div className="pt-16 lg:pt-4 px-6 pb-6">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h1 className="text-2xl font-bold text-white">Java Tutorial</h1>
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-gray-700"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <div 
                className="flex justify-between items-center text-xl font-bold text-purple-300 border-b-2 border-purple-500 pb-3 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <h2 className="tracking-wide">{section.title}</h2>
                <span className="text-purple-300">
                  {expandedSections[section.id] ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                </span>
              </div>
              
              {expandedSections[section.id] && (
                <ul className="mt-4 space-y-2 pl-1">
                  {section.pages.map(({ path, label }) => (
                    <li key={path} className="transform transition-transform duration-200 hover:translate-x-1">
                      <Link
                        href={path}
                        className={`block p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          pathname === path
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                            : "text-gray-200 hover:bg-gray-700/50 hover:text-purple-300"
                        }`}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-300 mb-3">Having trouble with Java concepts? Check our resources or contact support.</p>
            <a 
              href="#" 
              className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Support
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-30  transition-opacity duration-300" 
          onClick={toggleSidebar} 
          aria-hidden="true" 
        />
      )}
    </div>
  )
}

export default SidebarJava

