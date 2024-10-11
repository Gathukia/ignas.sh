import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyVisualizer from './Visualizer';
import { useTheme } from 'next-themes';

const SpotifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastPlayedTrack, setLastPlayedTrack] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const fetchSpotifyData = async () => {
    try {
      const response = await axios.post('/api/spotify', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setIsChanging(true);
        setTimeout(() => {
          if (data.nowPlaying && data.nowPlaying.item) {
            setCurrentTrack(data.nowPlaying.item);
            setIsPlaying(data.nowPlaying.is_playing);
            if (!data.nowPlaying.is_playing) {
              setLastPlayedTrack(data.nowPlaying.item);
            }
          }
          setTopTracks(data.topTracks);
          setIsChanging(false);
        }, 500);
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

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000); // Polling every 30 seconds

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
          <p className="text-sm text-foreground flex items-center">
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
        className="relative h-full w-full overflow-hidden rounded-lg border border-border border-2 drop-shadow-xl cursor-pointer"
        onClick={() => handleClick(track)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur brightness-90 dark:blur-md dark:brightness-50"
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

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-background text-foreground">
        😔 Error: {error}
      </div>
    );
  }

  if (!isOnline && !lastPlayedTrack) {
    return (
      <div className="flex items-center justify-center h-full bg-background text-foreground">
        😔 No track playing.
      </div>
    );
  }

  return currentTrack ? renderPlayerContent(currentTrack, true) : renderPlayerContent(lastPlayedTrack, false);
};

export default SpotifyPlayer;