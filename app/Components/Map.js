import React, { useState, useEffect, useCallback, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Cloud, Droplets, Sun, Wind } from 'lucide-react';

const IntegratedComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: 36.8219, // Coordinates for Nairobi
    latitude: -1.2921,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  const [weather, setWeather] = useState({
    temp: null,
    condition: null,
    humidity: null,
    windSpeed: null,
    error: null,
  });
  const [time, setTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [markerScale, setMarkerScale] = useState(1);
  const mapRef = useRef(null);
  const animationRef = useRef(null);

  const { theme } = useTheme();
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

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
        setWeather(prev => ({ ...prev, error: 'Unable to load weather data' }));
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000);

    const timeInterval = setInterval(() => {
      setTime(new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })));
    }, 1000);

    setIsMounted(true);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const smoothZoom = useCallback((targetZoom, duration = 1000) => {
    const startZoom = viewState.zoom;
    const startTime = Date.now();
    const startMarkerScale = markerScale;
    const targetMarkerScale = 1 + (targetZoom - 12) * 0.3; // Adjust marker size based on zoom level

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const newZoom = startZoom + (targetZoom - startZoom) * easedProgress;
      const newMarkerScale = startMarkerScale + (targetMarkerScale - startMarkerScale) * easedProgress;

      setViewState(prev => ({
        ...prev,
        zoom: newZoom,
      }));
      setMarkerScale(newMarkerScale);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [viewState.zoom, markerScale]);

  const handleZoom = useCallback(
    (direction) => {
      const zoomChange = direction === 'in' ? 1 : -1;
      const targetZoom = Math.min(Math.max(viewState.zoom + zoomChange, 0), 22);
      smoothZoom(targetZoom);
    },
    [viewState.zoom, smoothZoom]
  );

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear':
        return <Sun className="w-7 h-7 text-yellow-400" />;
      case 'Clouds':
        return <Cloud className="w-7 h-7 text-gray-400" />;
      case 'Rain':
        return <Droplets className="w-7 h-7 text-blue-400" />;
      default:
        return <Cloud className="w-7 h-7 text-gray-400" />;
    }
  };

  const formatTime = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!isMounted || !time) {
    return null;
  }

  const mapStyle = theme === 'dark'
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11';

  return (
    <div className="relative w-full h-[300px] md:h-[300px] lg:h-[300px] rounded-3xl overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        attributionControl={false}
        dragPan={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        touchRotate={false}
        keyboard={false}
      >
        <Marker longitude={viewState.longitude} latitude={viewState.latitude} anchor="center">
          <div className={`relative transition-all duration-300 ease-out`} style={{ transform: `scale(${markerScale})` }}>
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-pulse"></div>
            <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <Image
                src="/images/ignas_image.jpg"
                quality={95}
                layout="fill"
                objectFit="cover"
                alt="Profile"
                className="rounded-full dark:saturate-0 contrast-125"
              />
            </div>
          </div>
        </Marker>
      </Map>

      {/* Weather and time overlay */}
      <div className="absolute top-0 font-space-mono left-0 right-0 p-2 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            {getWeatherIcon()}
            <div>
              <div className="text-xl font-semibold">{weather.temp}°C</div>
              <div className="text-xs opacity-80">{weather.condition}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">{formatTime(time)}</div>
            <div className="text-xs opacity-80">Nairobi, Kenya</div>
          </div>
        </div>
        <div className="flex justify-center space-x-3 text-xs opacity-80">
          <div className="flex items-center">
            <Droplets className="w-3 h-3 mr-1" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-3 h-3 mr-1" />
            <span>{weather.windSpeed}m/s</span>
          </div>
        </div>
      </div>

      {/*zooming mechanisim*/}
      <div className="absolute bottom-10 left-4">
        <button
          className="bg-white/60 dark:bg-black/60 text-black dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 text-lg font-bold relative group"
          onClick={() => handleZoom('out')}
        >
          −
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Zoom Out
          </span>
          <div className="absolute inset-0 rounded-full bg-white/30 dark:bg-black/30 scale-0 group-hover:scale-150 transition-transform duration-300"></div>
        </button>
      </div>
      <div className="absolute bottom-10 right-4">
        <button
          className="bg-white/60 dark:bg-black/60 text-black dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 text-lg font-bold relative group"
          onClick={() => handleZoom('in')}
        >
          +
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Zoom In
          </span>
          <div className="absolute inset-0 rounded-full bg-white/30 dark:bg-black/30 scale-0 group-hover:scale-150 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-1 left-1 text-[8px] text-white/40 hover:text-white/60 transition-colors duration-200">
        © Mapbox © OpenStreetMap
      </div>
    </div>
  );
};

export default IntegratedComponent;