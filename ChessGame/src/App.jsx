import React, { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { FaTimes, FaChevronRight } from 'react-icons/fa'
// import { FiSearch } from 'react-icons/fi'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const menuItems = [
    { label: "Play", subItems: ["Play Computer", "Tournaments", "4 Player & Variants", "Leaderboard"] },
    { label: "Puzzles" },
    { label: "Learn" },
    { label: "Watch" },
    { label: "News" },
    { label: "Social" },
    { label: "More" },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)
  const toggleSubmenu = (label) => setActiveSubmenu(activeSubmenu === label ? null : label)

  return (
    <div className="relative min-h-screen font-sans">
      <button
        className="fixed top-4 left-4 z-50 lg:hidden text-black"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes size={24} /> : <IoMdMenu size={24} />}
      </button>

      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4">
            {/* <div className="relative">
              <input
                type="search"
                placeholder="Search"
                className="w-full p-2 pl-8 bg-gray-700 text-white rounded-md outline-none"
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div> */}
          </div>

          <nav className="flex-grow overflow-y-auto">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  className="w-full p-3 text-left hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => item.subItems && toggleSubmenu(item.label)}
                >
                  {item.label}
                  {item.subItems && <FaChevronRight className={`transform transition-transform ${activeSubmenu === item.label ? 'rotate-90' : ''}`} />}
                </button>
                {item.subItems && activeSubmenu === item.label && (
                  <div className="bg-gray-900">
                    {item.subItems.map((subItem, subIndex) => (
                      <button key={subIndex} className="w-full p-3 pl-6 text-left hover:bg-gray-800">
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 space-y-2">
            <button className="w-full p-2 bg-green-500 hover:bg-green-600 rounded-md">
              Sign Up
            </button>
            <button className="w-full p-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md">
              Login
            </button>
            <div className="flex justify-between text-sm text-gray-400">
              <span>English</span>
              <span>Help</span>
            </div>
          </div>
        </div>
      </div>

      <main className="lg:ml-64 p-12 ">
        <h1 className="text-2xl font-bold">Main Content</h1>
        {/* Your main content goes here */}
      </main>
    </div>
  )
}