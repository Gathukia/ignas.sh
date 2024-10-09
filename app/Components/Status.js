import React, { useState, useEffect } from 'react';
import { Radio, MapPin } from 'lucide-react';

const PingingStatus = ({ status }) => {
  const baseClasses = "w-3 h-3 rounded-full";
  const colorClass = 
    status === 'online' ? 'bg-green-500' :
    status === 'idle' ? 'bg-yellow-500' :
    status === 'dnd' ? 'bg-red-500' :
    'bg-gray-500';
  const pingClass = status === 'online' || status === 'dnd' ? 'animate-ping' : '';

  return (
    <div className="relative">
      <div className={`${baseClasses} ${colorClass} ${pingClass} absolute opacity-75`}></div>
      <div className={`${baseClasses} ${colorClass} relative`}></div>
    </div>
  );
};

const DiscordStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/963425032426635345');
        const data = await response.json();
        setStatus(data.data);
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!status) return <p>Loading Discord status...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm mx-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Radio className="w-4 h-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Discord Status</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <PingingStatus status={status.discord_status} />
        <span className="text-lg font-medium capitalize text-gray-800 dark:text-white">
          {status.discord_status}
        </span>
      </div>
      {status.activities && status.activities.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {status.activities[0].name}
        </div>
      )}
      {status.kv && status.kv.location && (
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{status.kv.location}</span>
        </div>
      )}
    </div>
  );
};

export default DiscordStatus;