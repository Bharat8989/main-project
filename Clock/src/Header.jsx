import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAlarm } from "react-icons/io";
import { FaClock, FaStopwatch } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";

export default function Header() {
    return (
        <header className="bg-gray-900 text-white fixed w-full z-10 shadow-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        <IoIosAlarm />
                        <span>Alarm</span>
                    </NavLink>
                    <NavLink
                        to="/clock"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        <FaClock />
                        <span>Clock</span>
                    </NavLink>
                    <NavLink
                        to="/stopwatch"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        <FaStopwatch />
                        <span>Stopwatch</span>
                    </NavLink>
                    <NavLink
                        to="/timer"
                        className={({ isActive }) => 
                            `flex items-center space-x-2 text-lg font-semibold transition ${
                            isActive ? 'text-blue-500' : 'hover:text-blue-400'
                        }`}
                    >
                        <GiSandsOfTime />
                        <span>Timer</span>
                    </NavLink>
                </div>

                {/* Mobile Navbar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-3 border-t border-gray-700 shadow-t">
                    <NavLink
                        to="/"
                        className={({ isActive }) => 
                            `flex flex-col items-center text-sm font-semibold transition ${
                            isActive ? 'text-blue-400' : 'hover:text-blue-400'
                        }`}
                    >
                        <IoIosAlarm size={24} />
                        <span>Alarm</span>
                    </NavLink>
                    <NavLink
                        to="/clock"
                        className={({ isActive }) => 
                            `flex flex-col items-center text-sm font-semibold transition ${
                            isActive ? 'text-blue-400' : 'hover:text-blue-400'
                        }`}
                    >
                        <FaClock size={24} />
                        <span>Clock</span>
                    </NavLink>
                    <NavLink
                        to="/stopwatch"
                        className={({ isActive }) => 
                            `flex flex-col items-center text-sm font-semibold transition ${
                            isActive ? 'text-blue-400' : 'hover:text-blue-400'
                        }`}
                    >
                        <FaStopwatch size={24} />
                        <span>Stopwatch</span>
                    </NavLink>
                    <NavLink
                        to="/timer"
                        className={({ isActive }) => 
                            `flex flex-col items-center text-sm font-semibold transition ${
                            isActive ? 'text-blue-400' : 'hover:text-blue-400'
                        }`}
                    >
                        <GiSandsOfTime size={24} />
                        <span>Timer</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
