import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome, {user?.name || 'User'}!</p>
            <ActivityFeed />
        </main>
    );
};

export default Dashboard;