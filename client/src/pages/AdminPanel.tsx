import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface User {
    id: number;
    username: string;
    role: string;
}

interface Role {
    id: number;
    name: string;
}

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const usersResponse: any = await api.get('/admin/users');
                const rolesResponse: any = await api.get('/admin/roles');
                setUsers(usersResponse);
                setRoles(rolesResponse);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch admin dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const handleRoleChange = async (userId: number, newRole: string) => {
        try {
            await api.put(`/admin/users/${userId}`, { role: newRole });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (err) {
            console.error(err);
            alert('Failed to update user role');
        }
    };

    if (loading) return <div className="p-6 text-slate-400">Loading admin panel...</div>;
    if (error) return <div className="p-6 text-rose-400">{error}</div>;

    return (
        <div className="admin-panel p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Control Panel</h1>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
                <h2 className="text-xl font-semibold text-slate-200">User Role Management</h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                <th className="py-3 px-4">User ID</th>
                                <th className="py-3 px-4">Username</th>
                                <th className="py-3 px-4">Current Role</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition">
                                    <td className="py-3.5 px-4 font-mono text-sm text-slate-400">{user.id}</td>
                                    <td className="py-3.5 px-4 font-semibold text-white">{user.username}</td>
                                    <td className="py-3.5 px-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                            user.role === 'Admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                            user.role === 'Editor' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4">
                                        <select
                                            className="bg-slate-800 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="Viewer">Viewer</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;