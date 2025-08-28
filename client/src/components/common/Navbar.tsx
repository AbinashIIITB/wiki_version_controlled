import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Version-Controlled Wiki</Link>
                <div className="space-x-4">
                    <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                    <Link to="/templates" className="text-gray-300 hover:text-white">Templates</Link>
                    <Link to="/search" className="text-gray-300 hover:text-white">Search</Link>
                    <Link to="/admin" className="text-gray-300 hover:text-white">Admin Panel</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;