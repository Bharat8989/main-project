"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FaSearch, FaMoon, FaSun, FaBell, FaBars, FaTimes } from "react-icons/fa"
import { useAuth, SignOutButton } from "@clerk/nextjs"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isSignedIn } = useAuth()

  // Toggle dark mode and persist in localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  // Check for saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
    }
  }, [])

  const menuItems = [
    { name: "Java", link: "/java" },
    { name: "DSA", link: "/dsa" },
    { name: "Web Tech", link: "/web-tech" },
    { name: "Foundation Courses", link: "/foundation-courses" },
    { name: "Data Science", link: "/data-science" },
    { name: "Practice Problem", link: "/practice-problem" },
  ]

  const uniqueMenuItems = Array.from(new Map(menuItems.map((item) => [item.name, item])).values())

  // Explicit toggle function for clarity
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState)
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="navbar border-b border-gray-300 dark:border-gray-700 py-4 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="navbar-start">
            <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-400">
              YourLogo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center overflow-x-auto">
            <ul className="flex gap-6 text-sm text-gray-700 dark:text-gray-200">
              {uniqueMenuItems.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <Link href={item.link} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Icons */}
          <div className="navbar-end flex items-center gap-4">
            <button className="p-2 hover:text-green-600 dark:hover:text-green-400 text-gray-700 dark:text-gray-200">
              <FaSearch />
            </button>
            <button
              className="p-2 hover:text-green-600 dark:hover:text-green-400 text-gray-700 dark:text-gray-200"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="p-2 hover:text-green-600 dark:hover:text-green-400 text-gray-700 dark:text-gray-200">
              <FaBell />
            </button>

            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Hamburger Menu Button - Visible on Mobile */}
            <button className="md:hidden p-2 text-gray-700 dark:text-gray-200" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shown when hamburger is clicked */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-4 transition-colors duration-200">
            <ul className="flex flex-col items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
              {uniqueMenuItems.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <Link
                    href={item.link}
                    className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isSignedIn && (
                <li>
                  <SignOutButton>
                    <button className="text-red-500 hover:text-red-600 transition-colors">Sign Out</button>
                  </SignOutButton>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

