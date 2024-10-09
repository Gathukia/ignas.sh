import React, { useState, useEffect } from 'react';
import { MapPinned, ArrowRight, Book, Film } from 'lucide-react';
import Activity from './Activity';
import useDiscordStatus from '../../hooks/useDiscordStatus';
import SpotifyPlayer from './spotify/Currentsong';
import PhotosComponent from './Photos';

const LocationBadge = ({ location, isFallback, isNew }) => {
  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 
      ${isNew ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}
      ${isFallback ? 'opacity-70' : ''}`}>
      <MapPinned className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-foreground dark:text-white">
        {location}
      </span>
      {isNew && !isFallback && (
        <span className="flex items-center text-xs text-green-600 dark:text-green-400">
          <ArrowRight className="w-3 h-3 mr-1" />
          New
        </span>
      )}
    </div>
  );
};

const ActivityLayout = ({ children, location, isFallback }) => {
  const [isNew, setIsNew] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);

  useEffect(() => {
    if (location !== prevLocation && !isFallback) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 5000);
      setPrevLocation(location);
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation, isFallback]);

  return (
    <div className="mb-4 bg-background border border-border rounded-3xl shadow hover:shadow-md transition-all duration-200">
      <div>{children}</div>
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-900 border-t border-border px-4 py-2 rounded-b-3xl">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {isFallback ? "Last known location:" : "Currently in:"}
        </p>
        <LocationBadge location={location} isFallback={isFallback} isNew={isNew} />
      </div>
    </div>
  );
};

const MusicComponent = () => {
  return (
    <div className="bg-transparent">
      <p className="text-sm text-muted-foreground mb-4">What I am currently listening to on Spotify:</p>
      <div className="w-full bg-gray-50 dark:bg-neutral-900 border border-border border-2 px-1 pt-px rounded-t-lg rounded-b-3xl">
        <div className="w-full lg:h-[170px] shadow-xlg">
          <SpotifyPlayer />
        </div>
        <div className="text-right px-4">
          <a
            href="https://open.spotify.com/user/314wv5afav5nxufnzacrc2ik2l5y"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-primary text-xs before:content-['●'] before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:text-lg transition-all duration-300 ease-in-out underline underline-offset-2 decoration-dashed hover:decoration-solid"
          >
            See all my playlists
          </a>
        </div>
      </div>
    </div>
  );
};

const Photos = () => {
  return (
    <div className="bg-transparent mt-8">
      <p className="text-sm text-muted-foreground dark:text-white mb-4">Recent Captures:</p>
      <div className="bg-gray-50 dark:bg-neutral-900 border border-border h-[350px] rounded-3xl">
        <PhotosComponent />
      </div>
    </div>
  );
};

const ActivityComponent = () => {
  const fallbackLocation = "Nairobi, Kenya";
  const { status, location, error, loading } = useDiscordStatus(fallbackLocation);

  if (loading) return <p>Loading Discord status...</p>;
  if (error) return <p>Error loading Discord status: {error}</p>;

  const isFallback = location === fallbackLocation;

  return (
    <div className="bg-transparent mx-auto relative max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3 text-primary">Activity</h2>
        <p className="text-sm text-muted-foreground mb-4">Stay updated on what&apos;s happening</p>
        <ActivityLayout location={location} isFallback={isFallback}>
          <div className="space-y-4">
            <Activity />
          </div>
        </ActivityLayout>
        <MusicComponent />
      </div>
    </div>
  );
};

export default ActivityComponent;