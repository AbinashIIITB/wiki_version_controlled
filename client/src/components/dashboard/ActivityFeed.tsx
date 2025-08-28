import React from 'react';

const ActivityFeed: React.FC = () => {
    const [activities, setActivities] = React.useState([]);

    React.useEffect(() => {
        // Fetch recent activities from the API
        const fetchActivities = async () => {
            const response = await fetch('/api/activities');
            const data = await response.json();
            setActivities(data);
        };

        fetchActivities();
    }, []);

    return (
        <div className="activity-feed">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <ul className="mt-4">
                {activities.map((activity, index) => (
                    <li key={index} className="border-b py-2">
                        <span className="font-semibold">{activity.user}</span> {activity.action} on {activity.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;