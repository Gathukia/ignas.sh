import { useState } from "react";
import { Play } from "react-icons/play";
import { MediaPlayer } from "@vidstack/react";
import Image from 'next/image'; // Import Next.js Image component
import '@vidstack/player/styles.css'; // Import default Vidstack styles

const VideoPlayer = ({ src, title, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative mb-4 rounded-xl overflow-hidden shadow-lg">
      {/* Watch Button on the Top Right */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm z-10">
        {title && title}
      </div>

      {/* Display Thumbnail if Video Not Playing */}
      {!isPlaying ? (
        <div className="relative">
          <Image
            src={thumbnail || `https://api.dicebear.com/6.x/shapes/svg?seed=${src}`}
            alt={title || "Video thumbnail"}
            width={640} // Provide width and height for Next.js Image optimization
            height={360}
            className="w-full h-48 md:h-64 lg:h-72 object-cover"
          />
          <button
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-300"
          >
            <div className="bg-blue-500 hover:bg-blue-600 rounded-full p-4 shadow-lg">
              <Play className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </button>
        </div>
      ) : (
        // Embed Vidstack Video Player when Playing
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <MediaPlayer
            src={src}
            poster={thumbnail || `https://api.dicebear.com/6.x/shapes/svg?seed=${src}`} // Poster image
            controls
            autoplay
            style={{ width: '100%', height: '100%' }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* Fallback content in case the video does not load */}
            <div slot="fallback">
              Sorry, your browser doesn&apos;t support embedded videos.
            </div>
          </MediaPlayer>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;