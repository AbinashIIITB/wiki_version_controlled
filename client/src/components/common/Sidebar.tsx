import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Wiki Navigation</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/documents">Documents</Link>
                </li>
                <li>
                    <Link to="/templates">Templates</Link>
                </li>
                <li>
                    <Link to="/admin">Admin Panel</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;