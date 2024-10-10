import React, { useState, useEffect } from 'react';
import SpotifyVisualizer from './Visualizer';
import { useTheme } from 'next-themes';
import Image from 'next/image'; // Import the Next.js Image component

const SpotifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPlayedTrack, setLastPlayedTrack] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.nowPlaying && data.nowPlaying.item) {
            setIsChanging(true);
            setTimeout(() => {
              setCurrentTrack(data.nowPlaying.item);
              setIsPlaying(data.nowPlaying.is_playing);
              if (!data.nowPlaying.is_playing) {
                setLastPlayedTrack(data.nowPlaying.item);
              }
              setIsChanging(false);
            }, 500);
          }
          setIsOnline(true);
        } else {
          console.error('Failed to fetch Spotify data');
          setIsOnline(false);
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setIsOnline(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 5000); // Polling every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load last played track from localStorage
    const savedTrack = localStorage.getItem('lastPlayedTrack');
    if (savedTrack) {
      setLastPlayedTrack(JSON.parse(savedTrack));
    }
  }, []);

  useEffect(() => {
    // Save last played track to localStorage
    if (lastPlayedTrack) {
      localStorage.setItem('lastPlayedTrack', JSON.stringify(lastPlayedTrack));
    }
  }, [lastPlayedTrack]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
  };

  const getArtistName = (artists) => {
    if (!artists || artists.length === 0) return 'Unknown Artist';
    const artistNames = artists.map((artist) => artist.name).join(', ');
    return truncateText(artistNames, 30);
  };

  const renderTrackInfo = (track, caption) => {
    if (!track) return null;
    return (
      <div className="w-2/3 px-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground flex items-center">
            {caption}{' '}
            {caption === 'Now Vibing' && (
              <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            )}
          </p>
        </div>
        <div className="overflow-hidden h-1/2 mb-2">
          {track.name && track.name.length > 20 ? (
            <div className="whitespace-nowrap animate-marquee-loop">
              <p className="text-lg font-bold text-foreground">{track.name}</p>
              <p className="text-lg font-bold text-foreground">&nbsp;&nbsp;&nbsp;{track.name}</p>
            </div>
          ) : (
            <p className="text-lg font-bold text-foreground">{track.name || 'Unknown Track'}</p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{getArtistName(track.artists)}</p>
      </div>
    );
  };

  const handleClick = (track) => {
    if (track && track.external_urls && track.external_urls.spotify) {
      window.open(track.external_urls.spotify, '_blank');
    }
  };

  const renderPlayerContent = (track, isCurrentTrack) => {
    if (!track || !track.album || !track.album.images || track.album.images.length === 0) {
      return (
        <div className="flex items-center justify-center h-full bg-background text-foreground">
          😔 No track information available
        </div>
      );
    }

    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={() => handleClick(track)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md"
          style={{ backgroundImage: `url(${track.album.images[0].url})` }}
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-background/70' : 'bg-background/30'}`} />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-2/6 relative overflow-visible">
            <SpotifyVisualizer 
              isPlaying={isPlaying} 
              albumImageUrl={track.album.images[0].url}
              isChanging={isChanging}
            />
          </div>
          {renderTrackInfo(track, isPlaying ? 'Now Playing' : 'Last Played')}
        </div>
      </div>
    );
  };

  if (!isOnline && !lastPlayedTrack) {
    return (
      <div className="flex items-center justify-center h-full bg-background text-foreground">
        😔 No track playing
      </div>
    );
  }

  return currentTrack ? renderPlayerContent(currentTrack, true) : renderPlayerContent(lastPlayedTrack, false);
};

export default SpotifyPlayer;