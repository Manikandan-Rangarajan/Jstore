import React from 'react';
import { Link } from 'react-router-dom';
import Joker from '../assets/Joker.png'

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side (Jstore) */}
                <div className="text-orange-200 text-2xl font-bold flex justify-between items-center">
                    <img src={Joker}  alt="JokerPanda"  className='w-[50px] h-[50px] rounded-full hover:cursor-pointer '/>
                    <Link to="/" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Jstore</Link>
                </div>

                {/* Right side (Links) */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/home" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Projects</Link>
                    </li>
                    <li>
                        <Link to="/pricing" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Pricing</Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">My Projects</Link>
                    </li>
                    <li>
                        <Link to="/logout" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Logout</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-orange-200 hover:cursor-pointer hover:text-gray-400">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
