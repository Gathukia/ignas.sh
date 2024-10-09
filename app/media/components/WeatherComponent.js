import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, Wind } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const WeatherComponent = () => {
  const [weather, setWeather] = useState({ temp: null, condition: null, humidity: null, windSpeed: null, error: null });

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
        setWeather({ temp: null, condition: null, humidity: null, windSpeed: null, error: 'Unable to load weather data' });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear': return <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />;
      case 'Clouds': return <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />;
      case 'Rain': return <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />;
      default: return <Cloud className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
      <CardContent className="p-2 sm:p-4 flex flex-col h-full justify-between">
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-primary uppercase">Weather</span>
          <span className="text-xs font-light text-muted-foreground">NBO</span>
        </div>
        {weather.error ? (
          <p className="text-destructive text-xs sm:text-sm my-2">Error: {weather.error}</p>
        ) : weather.temp !== null ? (
          <>
            <div className="flex items-center justify-between my-2 sm:my-4">
              <div className="flex items-center">
                {getWeatherIcon()}
                <span className="text-xl sm:text-3xl md:text-4xl font-light text-primary ml-2">{weather.temp}°C</span>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-medium text-primary">{weather.condition}</p>
                <p className="text-xs text-muted-foreground">Humidity: {weather.humidity}%</p>
                <p className="text-xs text-muted-foreground">Wind: {weather.windSpeed} m/s</p>
              </div>
            </div>
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
          </>
        ) : (
          <p className="text-xs sm:text-sm text-muted-foreground my-2">Loading weather data...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherComponent;