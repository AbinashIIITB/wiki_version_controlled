import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Activity {
    id: number;
    user: string;
    action: string;
    date: string;
}

const ActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Fetch documents and map them dynamically to beautiful recent actions
                const documents: any = await api.get('/documents');
                const mapped: Activity[] = documents.slice(0, 5).map((doc: any) => ({
                    id: doc.id,
                    user: doc.author?.username || 'Wiki Contributor',
                    action: `updated the wiki document "${doc.title}"`,
                    date: new Date(doc.updatedAt || doc.createdAt).toLocaleString(),
                }));
                setActivities(mapped);
            } catch (err) {
                console.error('Failed to fetch activity feed:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className="activity-feed p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-white">Recent updates</h2>
            {loading ? (
                <p className="text-slate-400 text-sm">Loading activity feed...</p>
            ) : activities.length === 0 ? (
                <p className="text-slate-500 text-sm italic">No recent activity found.</p>
            ) : (
                <div className="relative border-l border-white/10 ml-3 space-y-6">
                    {activities.map((activity) => (
                        <div key={activity.id} className="relative pl-6">
                            {/* Visual Timeline Dot */}
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border border-slate-900" />
                            <div className="text-sm">
                                <span className="font-semibold text-white">{activity.user}</span>{' '}
                                <span className="text-slate-300">{activity.action}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">{activity.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityFeed;