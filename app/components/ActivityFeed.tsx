// components/ActivityFeed.tsx
import React, { useEffect, useState } from "react";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch("/api/activities?page=1", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setActivities(data.activities);
      } catch (err) {
        console.error("Failed to load activities:", err);
        setError("Failed to load activities. Please try again later.");
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="activity-feed bg-teal-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Latest Activities</h3>
      {error && <p className="text-red-500">{error}</p>}
      {activities.length > 0 ? (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="activity-item">
              <p className="text-xs text-gray-700">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-blue-900 font-semibold">
                {activity.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No recent activities found.</p>
      )}
    </div>
  );
};

export default ActivityFeed;