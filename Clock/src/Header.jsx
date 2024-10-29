import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAlarm } from "react-icons/io";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white fixed w-full z-10">
            <nav className="container mx-auto p-4 flex justify-center ">
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex items-center space-x-2">
                            <IoIosAlarm />
                            <span>Alarm</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/Clock"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex items-center space-x-2">
                            <IoIosAlarm />
                            <span>Clock</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/stopwatch"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex items-center space-x-2">
                            <IoIosAlarm />
                            <span>Stopwatch</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/timer"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex items-center space-x-2">
                            <IoIosAlarm />
                            <span>
                                Timer
                            </span>
                        </div>
                    </NavLink>
                </div>

                {/* Mobile Navbar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around py-2 border-t border-gray-700">
                    <NavLink
                        to="/"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex flex-col items-center">
                            <IoIosAlarm />
                            <span>Alarm</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/clock"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex flex-col items-center">
                            <IoIosAlarm />
                            <span>Clock</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/stopwatch"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex flex-col items-center">
                            <IoIosAlarm />
                            <span>Stopwatch</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/timer"
                        className="text-lg font-semibold hover:text-blue-400"
                        activeClassName="text-blue-500"
                    >
                        <div className="flex flex-col items-center">
                            <IoIosAlarm />
                            <span>Timer</span>
                        </div>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
