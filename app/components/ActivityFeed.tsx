// components/ActivityFeed.tsx
import React from "react";
import useSWR from "swr";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

const fetcher = (url: string) =>
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((res) => res.json());

const ActivityFeed: React.FC = () => {
  const { data, error } = useSWR("/api/activities?page=1", fetcher, {
    refreshInterval: 5000, // Optional: Poll every 5 seconds for updates
  });

  const activities: Activity[] = data?.activities || [];

  return (
    <div className="activity-feed bg-teal-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Latest Activities</h3>
      {error && <p className="text-red-500">Failed to load activities. Please try again later.</p>}
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