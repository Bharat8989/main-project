import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  IoMdMenu, IoMdClose } from "react-icons/io";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <header className="bg-gray-900 text-white fixed w-full z-10 shadow-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-lg font-bold">MyApp</div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        
                        <span>Play</span>
                    </NavLink>
                    <NavLink
                        to="/clock"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        
                        <span>Clock</span>
                    </NavLink>
                    <NavLink
                        to="/stopwatch"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        
                        <span>Stopwatch</span>
                    </NavLink>
                    <NavLink
                        to="/timer"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                       
                        <span>Timer</span>
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="text-lg font-semibold hover:text-blue-400"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="text-lg font-semibold text-blue-500"
                    >
                        Sign Up
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={toggleSidebar}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                </button>
            </nav>

            {/* Sidebar for Mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-20">
                    <div className="flex flex-col h-full w-full">
                        <button 
                            className="p-4 text-white flex items-center justify-between"
                            onClick={toggleSidebar}
                            aria-label="Close Menu"
                        >
                            <span className="text-lg font-bold">Menu</span>
                            <IoMdClose size={24} />
                        </button>
                        <div className="flex flex-col items-center">
                            <NavLink
                                to="/"
                                className="flex items-center w-full p-4 hover:bg-gray-700 ml-2"
                                onClick={toggleSidebar}
                            >
                                
                                <span className="ml-2">Play</span>
                            </NavLink>
                            <NavLink
                                to="/clock"
                                className="flex items-center w-full p-4 hover:bg-gray-700 ml-1"
                                onClick={toggleSidebar}
                            >
                               
                                <span className="ml-2">Clock</span>
                            </NavLink>
                            <NavLink
                                to="/stopwatch"
                                className="flex items-center w-full p-4 hover:bg-gray-700"
                                onClick={toggleSidebar}
                            >
                               
                                <span className="ml-2">Stopwatch</span>
                            </NavLink>
                            <NavLink
                                to="/timer"
                                className="flex items-center w-full p-4 hover:bg-gray-700"
                                onClick={toggleSidebar}
                            >
                                
                                <span className="ml-2">Timer</span>
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="flex items-center w-full p-4 hover:bg-gray-700 ml-3"
                                onClick={toggleSidebar}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="flex items-center w-full p-4 text-blue-500 hover:bg-gray-700 ml-3"
                                onClick={toggleSidebar}
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
