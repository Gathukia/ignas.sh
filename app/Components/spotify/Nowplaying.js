import React, { useEffect, useState, useCallback } from 'react';
import { Music, Star, ExternalLink } from 'lucide-react';
import SpotifyPlayer from './Currentsong';

const SpotifyDashboard = () => {
  const [spotifyData, setSpotifyData] = useState({ nowPlaying: null, topTracks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpotifyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/spotify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`Failed to fetch Spotify data: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setSpotifyData({
        nowPlaying: data.nowPlaying || null,
        topTracks: Array.isArray(data.topTracks) ? data.topTracks.slice(0, 5) : [],
      });
    } catch (err) {
      console.error('Error fetching Spotify data:', err);
      setError('Failed to fetch Spotify data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 3000000);
    return () => clearInterval(interval);
  }, [fetchSpotifyData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16 bg-background rounded-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive px-3 py-2 rounded-md text-sm" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background text-foreground p-4">
      <h1 className="text-xl font-bold mb-4">My Spotify Dashboard</h1>
      
      <div className="space-y-4">
        {/* Spotify Player - Always at the top */}
        <div className="bg-card text-card-foreground shadow-sm rounded-md p-3 h-full">
          <SpotifyPlayer />
        </div>
        
        {/* Grid for Top Tracks and Playlists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Tracks Section */}
          <div className="bg-card text-card-foreground shadow-sm rounded-md p-3">
            <h2 className="text-base font-semibold mb-2 flex items-center">
              <Star className="text-primary mr-1" size={16} />
              Your Top 5 Tracks
            </h2>
            {spotifyData.topTracks.length > 0 ? (
              <ul className="space-y-2">
                {spotifyData.topTracks.map((track, index) => (
                  <li key={track.id} className="flex items-center space-x-2 p-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <span className="text-muted-foreground text-xs">{index + 1}</span>
                    <img
                      src={track.album.images[2]?.url}
                      alt={track.name}
                      className="w-8 h-8 rounded-sm"
                    />
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium truncate">{track.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {track.artists.map(artist => artist.name).join(', ')}
                      </p>
                    </div>
                    <Music className="text-muted-foreground" size={14} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No top tracks available</p>
            )}
          </div>

          {/* Favorite Playlists Section */}
          <div className="bg-card text-card-foreground shadow-sm rounded-md p-3">
            <h2 className="text-base font-semibold mb-2 flex items-center">
              <Music className="text-primary mr-1" size={16} />
              Favorite Playlists
            </h2>
            <ul className="space-y-2">
              {[
                { name: 'House Music', color: 'bg-purple-500', link: 'https://open.spotify.com/playlist/4GMMxBlToLY5VbtxbTObwu?si=da68d97634ff44b4' },
                { name: 'Indie Rock Music', color: 'bg-green-500', link: 'https://open.spotify.com/playlist/4LFDbHJ9FNYuOTAoIAar8j?si=d4a388609377499c' },
                { name: 'Reggae Music', color: 'bg-yellow-500', link: 'https://open.spotify.com/playlist/4qqazQdwqbZOA8QRA5PIia?si=642590440dd74a84' }
              ].map((playlist, index) => (
                <li key={index} className="flex items-center space-x-2 p-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                  <div className={`w-6 h-6 ${playlist.color} rounded-sm flex items-center justify-center`}>
                    <Music className="text-white" size={12} />
                  </div>
                  <span className="flex-1 text-sm font-medium truncate">{playlist.name}</span>
                  <a
                    href={playlist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
            {/* Link to Spotify Profile */}
            <div className="mt-2 text-right">
              <a
                href="https://open.spotify.com/user/314wv5afav5nxufnzacrc2ik2l5y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                See all my playlists
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyDashboard;


