import { useState, useEffect } from 'react';

const useDiscordStatus = (fallbackLocation = "Nairobi, Kenya") => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(fallbackLocation);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/963425032426635345');
        if (!response.ok) {
          throw new Error('Failed to fetch Discord status');
        }
        const data = await response.json();
        setStatus(data.data);
        setLocation(data.data.kv?.location || fallbackLocation);
        setError(null);
      } catch (error) {
        console.error('Error fetching Discord status:', error);
        setError(error.message);
        setLocation(fallbackLocation);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 600000); // Update every minute
    return () => clearInterval(interval);
  }, [fallbackLocation]);

  return { status, location, error, loading };
};

export default useDiscordStatus;