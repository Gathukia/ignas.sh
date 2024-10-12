import React, { useState, useEffect } from 'react';
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

  const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

  console.log("client id", SPOTIFY_CLIENT_ID);
  console.log("client secret", SPOTIFY_CLIENT_SECRET);

  const getAccessToken = async () => {
    const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    const data = await response.json();
    return data.access_token;
  };

  const getNowPlaying = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  };

  const getTopTracks = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data.items;
  };

  const fetchSpotifyData = async () => {
    try {
      const accessToken = await getAccessToken();
      const nowPlayingData = await getNowPlaying(accessToken);
      const topTracksData = await getTopTracks(accessToken);

      setIsChanging(true);
      setTimeout(() => {
        if (nowPlayingData && nowPlayingData.item) {
          setCurrentTrack(nowPlayingData.item);
          setIsPlaying(nowPlayingData.is_playing);
          if (!nowPlayingData.is_playing) {
            setLastPlayedTrack(nowPlayingData.item);
          }
        } else if (lastPlayedTrack) {
          setCurrentTrack(null);
          setIsPlaying(false);
        }
        setTopTracks(topTracksData);
        setIsChanging(false);
      }, 500);
      setIsOnline(true);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      setIsOnline(false);
      setError('Failed to fetch Spotify data');
    }
  };

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 15000); // Polling every 15 seconds

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
      <div className="w-2/3 px-2 md:px-4 lg:px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
          <p className="text-sm text-foreground flex items-center">
            {caption}{' '}
            {caption === 'Now Vibing' && (
              <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            )}
          </p>
        </div>
        <div className="overflow-hidden h-1/2 mb-2 md:mb-4 lg:mb-6">
          {track.name && track.name.length > 20 ? (
            <div className="whitespace-nowrap animate-marquee-loop">
              <p className="text-lg font-bold text-foreground">{track.name}</p>
              <p className="text-lg font-bold text-foreground">&nbsp;&nbsp;&nbsp;{track.name}</p>
            </div>
          ) : (
            <p className="text-lg font-bold text-foreground">{track.name || 'Unknown Track'}</p>
          )}
        </div>
        <p className="text-sm text-primary">{getArtistName(track.artists)}</p>
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
        😔 No track playing.
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