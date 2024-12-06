import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

function Navbar() {
    return (
        <header className="h-16 border-b w-full px-6 flex items-center justify-between bg-white shadow-md">
            {/* Left Section: Logo */}
            <div className="font-bold">Event Dashboard</div>

            {/* Middle Section: Search Bar */}
            <div className="flex items-center w-1/3 bg-gray-100 rounded-md px-3 py-2">
                <FaSearch className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search events"
                    className="ml-2 w-full bg-transparent focus:outline-none"
                />
            </div>

            {/* Right Section: Notifications and User */}
            <div className="flex items-center gap-4">
                {/* Notifications Dropdown */}
                <div className="relative">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        <FaBell className="text-gray-600" />
                    </button>
                    {/* Dropdown (Hidden by default) */}
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg hidden">
                        <div className="p-4">No new notifications</div>
                    </div>
                </div>

                {/* User Avatar */}
                <div className="flex items-center gap-2">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
