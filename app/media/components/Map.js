import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Sun, Moon } from 'lucide-react';

// Replace with your actual Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = ({ isDarkMode = false, onToggleDarkMode }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(12);
  const [lng, setLng] = useState(36.8219); // Longitude for Nairobi
  const [lat, setLat] = useState(-1.2921); // Latitude for Nairobi

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom,
      interactive: true // Enable map interactions
    });

    // Add navigation control (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }), 'bottom-right');

    // Add custom marker
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = "url('/api/placeholder/50/50')";
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.backgroundSize = '100%';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Add event listener for map movement
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // Wait for map to initialize
    map.current.setStyle(isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11');
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-0 left-0 m-3 p-2 bg-white dark:bg-gray-800 rounded shadow">
        <p className="text-sm font-semibold">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </p>
      </div>
      <button
        onClick={onToggleDarkMode}
        className="absolute top-0 right-0 m-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default MapComponent;