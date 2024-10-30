// components/ActivityFeed.tsx
import React, { useEffect, useState } from "react";

interface Activity {
  id: string;
  description: string;
  timestamp: string;
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      const response = await fetch("/api/activities?page=1");
      const data = await response.json();
      setActivities(data.activities);
    }
    loadActivities();
  }, []);

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item mb-2">
          <span className="activity-time text-sm">{activity.timestamp}</span>
          <p className="activity-description font-semibold">
            {activity.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;