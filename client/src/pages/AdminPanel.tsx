import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserRole } from '../types';

const AdminPanel: React.FC = () => {
    const users = useSelector((state: RootState) => state.auth.users);
    const roles = useSelector((state: RootState) => state.auth.roles);

    return (
        <div className="admin-panel">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <div className="mt-4">
                <h2 className="text-xl">User Management</h2>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Username</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.username}</td>
                                <td className="border border-gray-300 p-2">{roles[user.roleId]?.name}</td>
                                <td className="border border-gray-300 p-2">
                                    <button className="text-blue-500">Edit</button>
                                    <button className="text-red-500 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;