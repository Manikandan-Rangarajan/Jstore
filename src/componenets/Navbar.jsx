import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side (Jstore) */}
                <div className="text-white text-2xl font-bold">
                    <Link to="/" className="text-white hover:cursor-pointer hover:text-gray-400">Jstore</Link>
                </div>

                {/* Right side (Links) */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/about-us" className="text-white hover:cursor-pointer hover:text-gray-400">About Us</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:cursor-pointer hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/pricing" className="text-white hover:cursor-pointer hover:text-gray-400">Pricing</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="text-white hover:cursor-pointer hover:text-gray-400">Projects</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:cursor-pointer hover:text-gray-400">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
