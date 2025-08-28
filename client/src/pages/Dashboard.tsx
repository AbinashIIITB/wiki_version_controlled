import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-4">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p>Welcome, {user?.name}!</p>
                    <ActivityFeed />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;