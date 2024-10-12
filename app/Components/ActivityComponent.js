import React, { useState, useEffect } from 'react';
import Activity from './Activity';
import SpotifyPlayer from './spotify/Currentsong';
import PhotosComponent from './Photos';
import DiscordStatus from './Status';

const ActivityLayout = ({ children, location, fallbackLocation = 'Nairobi' }) => {
  const [isNew, setIsNew] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location || fallbackLocation);

  useEffect(() => {
    if (location && location !== currentLocation) {
      setIsNew(true);
      setCurrentLocation(location);
      const timer = setTimeout(() => setIsNew(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location, currentLocation]);

  return (
    <div className="mb-4 bg-background border border-border rounded-3xl shadow hover:shadow-md transition-all duration-200">
      <div>{children}</div>
      <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-900 border-t border-border px-2 py-2 rounded-b-3xl">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Right now I&apos;m currently in <span className="underline">{currentLocation}</span> 📍
        </p>
      </div>
    </div>
  );
};

const MusicComponent = () => {
  return (
    <div className="bg-transparent">
      <p className="text-sm text-muted-foreground mb-4">What I&apos;m currently listening to on Spotify:</p>
      <div className="w-full bg-gray-50 dark:bg-neutral-900 border border-border border-2 rounded-t-xl rounded-b-3xl">
        <div className="w-full shadow-xlg">
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
  const status = DiscordStatus.useDiscordStatus();
  const location = status?.kv?.location || fallbackLocation;
  const isFallback = location === fallbackLocation;

  if (!status) return <p className="text-sm text-muted-foreground">Loading Discord status...</p>;

  return (
    <div className="bg-transparent mx-auto relative max-w-2xl">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3 text-primary">Activity</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Stay updated on what&apos;s happening.
        </p>
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