import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, Wind, Calendar } from 'lucide-react';

const TimeComponent = () => {
  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    humidity: null,
    windSpeed: null,
    error: null,
  });
  const [time, setTime] = useState(null); // Start as null and update after mount
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&units=metric&appid=0c810144be0464204165656fd6763436`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          error: null,
        });
      } catch (error) {
        setWeather({
          temp: null,
          condition: null,
          humidity: null,
          windSpeed: null,
          error: 'Unable to load weather data',
        });
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    const timeInterval = setInterval(() => {
      setTime(new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })));
    }, 1000);

    setIsMounted(true); // Set mounted state to true

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'Clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'Rain':
        return <Droplets className="w-8 h-8 text-blue-400" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  const formatTime = (date) => {
    if (!date) return null; // Ensure date exists
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return (
      <div className="flex items-center justify-center">
        <div className="text-primary text-base sm:text-xsm lg:text-sm font-light">
          {hours}
          <span className="text-muted-foreground">:</span>
          {minutes}
        </div>
        <div className="ml-2 flex flex-col items-start">
          <span className="text-xs sm:text-xsm lg:text-sm text-primary">{seconds}</span>
          <span className="text-xs text-muted-foreground">SEC</span>
        </div>
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date) return null; // Ensure date exists
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isMounted || !time) {
    return null; // Avoid rendering dynamic content on server and ensure time is available
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-secondary/80 to-secondary/30 shadow-lg rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-primary">
            {formatDate(time)}
          </span>
        </div>
        <span className="text-xs font-light text-muted-foreground">NBO</span>
      </div>

      <div className="flex-grow grid grid-cols-2 gap-2 items-center">
        <div className="flex flex-col items-start justify-center">
          <div className="text-primary text-lg font-medium">
            {formatTime(time)}
          </div>
        </div>

        {weather.error ? (
          <p className="text-destructive text-xs">{weather.error}</p>
        ) : weather.temp !== null ? (
          <div className="flex flex-col items-end justify-center">
            <div className="flex items-center mb-1">
              {getWeatherIcon()}
              <span className="text-sm font-medium text-primary ml-1">
                {weather.temp}°C
              </span>
            </div>
            <p className="text-xs font-medium text-primary">{weather.condition}</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Loading weather...</p>
        )}
      </div>

      {weather.temp !== null && !weather.error && (
        <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-border">
          <div className="flex justify-between items-center text-primary">
            <div className="flex items-center">
              <Droplets className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs">{weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs">{weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeComponent;