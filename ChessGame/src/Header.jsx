import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Play', href: '/play' },
  { name: 'Puzzles', href: '/puzzles' },
  { name: 'Learn', href: '/learn' },
  { name: 'Login', href: '/login' },
  { name: 'Sign Up', href: '/signup' },
];

export default function ResponsiveNavigation() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col border-r bg-white w-64 shadow-md">
        <div className="p-4 text-xl font-bold border-b">MyApp</div>
        <nav className="flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block p-4 text-lg font-medium transition-colors rounded-md ${
                location.pathname === item.href ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-md z-50">
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">MyApp</div>
          <button onClick={() => setMenuOpen(!isMenuOpen)} aria-label="Open Menu">
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 z-40">
            <div className="flex justify-between p-4 bg-gray-900 border-b">
              <div className="text-xl font-bold text-white">Menu</div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
                <FaTimes className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-lg font-medium text-white transition-colors ${
                    location.pathname === item.href ? 'bg-blue-500' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 lg:p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to MyApp</h1>
        <p>This is where your main content would go.</p>
      </main>
    </div>
  );
}
