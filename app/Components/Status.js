import React, { useState, useEffect } from 'react';
import { Radio, MapPin } from 'lucide-react';

// Hook for fetching Discord status
export const useDiscordStatus = () => {
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
    const interval = setInterval(fetchStatus, 600000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return status;
};

// Function to get the user's avatar URL
export const getAvatarUrl = (status) => {
  return status?.discord_user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png`
    : null;
};

// Function to get the user's current activity
export const getCurrentActivity = (status) => {
  return status?.activities && status.activities.length > 0
    ? status.activities[0].name
    : null;
};

// Function to get the user's location
export const getLocation = (status) => {
  return status?.kv?.location || null;
};

// PingingStatus component
export const PingingStatus = ({ status }) => {
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

// Avatar component
export const Avatar = ({ avatarUrl }) => (
  <img src={avatarUrl} alt="Profile" className="w-12 h-12 rounded-full" />
);

// StatusHeader component
export const StatusHeader = () => (
  <div className="flex items-center space-x-2 mb-4">
    <Radio className="w-4 h-4 text-gray-400" />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Discord Status</span>
  </div>
);

// StatusDisplay component
export const StatusDisplay = ({ status }) => (
  <div className="flex items-center space-x-2 mb-2">
    <PingingStatus status={status} />
    <span className="text-lg font-medium capitalize text-gray-800 dark:text-white">
      {status}
    </span>
  </div>
);

// ActivityDisplay component
export const ActivityDisplay = ({ activity }) => (
  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
    {activity}
  </div>
);

// LocationDisplay component
export const LocationDisplay = ({ location }) => (
  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
    <MapPin className="w-4 h-4" />
    <span>{location}</span>
  </div>
);

// Main export object
const DiscordStatus = {
  useDiscordStatus,
  getAvatarUrl,
  getCurrentActivity,
  getLocation,
  PingingStatus,
  Avatar,
  StatusHeader,
  StatusDisplay,
  ActivityDisplay,
  LocationDisplay
};

export default DiscordStatus;