import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

const photos = [
  "/images/photo1.png",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.jpg",
  "/images/photo6.jpg",
  "/images/photo7.jpg",
  "/images/photo8.jpg",
  "/images/photo9.jpg",
];

const PhotosComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedPhotos, setDisplayedPhotos] = useState(photos);
  const [direction, setDirection] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const audioRef = useRef(null);

  const selectedPhoto = useMemo(() => displayedPhotos[selectedIndex], [displayedPhotos, selectedIndex]);

  const scrollToCenter = useCallback(() => {
    const container = thumbnailContainerRef.current;
    if (container) {
      const selectedThumb = container.children[selectedIndex];
      if (selectedThumb) {
        const scrollPosition = selectedThumb.offsetLeft - container.clientWidth / 2 + selectedThumb.clientWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    scrollToCenter();
  }, [selectedIndex, scrollToCenter]);

  const handleScroll = useCallback(() => {
    const container = thumbnailContainerRef.current;
    if (container && container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
      setDisplayedPhotos(prevPhotos => [...prevPhotos, ...photos]);
    }
  }, []);

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (container) {
      const debouncedHandleScroll = debounce(handleScroll, 200);
      container.addEventListener("scroll", debouncedHandleScroll);
      return () => container.removeEventListener("scroll", debouncedHandleScroll);
    }
  }, [handleScroll]);

  const handleSelectPhoto = useCallback((index) => {
    if (index !== selectedIndex) {
      setDirection(index > selectedIndex ? 1 : -1);
      setSelectedIndex(index);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row border border-border">
      <div className="relative w-full md:w-3/4 h-full flex items-center justify-center overflow-hidden pb-4">
        <Image
          key={selectedPhoto}
          src={selectedPhoto}
          alt="Selected Photo"
          layout="fill"
          objectFit="cover"
          className={`absolute rounded-3xl shadow-lg transition-transform duration-300 ease-in-out ${
            direction > 0 ? 'animate-slide-left' : 'animate-slide-right'
          }`}
        />
      </div>

      <div
        className="w-full md:w-1/4 h-1/4 md:h-full flex md:flex-col overflow-x-auto md:overflow-y-auto justify-start items-center"
        ref={thumbnailContainerRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayedPhotos.map((photo, index) => (
          <Thumbnail
            key={`${photo}-${index}`}
            photo={photo}
            index={index}
            isSelected={selectedIndex === index}
            onSelect={handleSelectPhoto}
          />
        ))}
      </div>

      <audio ref={audioRef} src="/sounds/shutter.mp3" preload="auto" />
    </div>
  );
};

const Thumbnail = React.memo(({ photo, index, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(index)}
      className={`flex-shrink-0 cursor-pointer m-2 transition-transform duration-200 ease-in-out hover:scale-110 ${
        isSelected ? "border-4 border-indigo-500 scale-120" : "scale-100"
      }`}
    >
      <Image
        src={photo}
        alt={`Thumbnail ${index + 1}`}
        width={60}
        height={60}
        className="object-cover rounded-xl shadow-lg transition-all"
        loading="lazy"
      />
    </div>
  );
});

// Adding displayName to resolve the display-name warning
Thumbnail.displayName = "Thumbnail";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default PhotosComponent;