import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0]); // Show the first photo by default
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedPhotos, setDisplayedPhotos] = useState(photos);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [direction, setDirection] = useState(0); // Direction of the animation
  const thumbnailContainerRef = useRef(null);
  const audioRef = useRef(null); // Reference for the shutter sound

  // Scroll to center the selected thumbnail automatically
  const scrollToCenter = useCallback(() => {
    const container = thumbnailContainerRef.current;
    if (container && selectedIndex !== null) {
      const selectedThumb = container.children[selectedIndex];
      if (selectedThumb) {
        const containerWidth = container.offsetWidth;
        const thumbWidth = selectedThumb.offsetWidth;
        const scrollPosition =
          selectedThumb.offsetLeft - containerWidth / 2 + thumbWidth / 2;
        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Trigger scroll centering whenever the selected index changes
  useEffect(() => {
    scrollToCenter();
  }, [selectedIndex, scrollToCenter]);

  // Handle infinite scrolling by adding more photos when reaching the end
  const handleScroll = useCallback(() => {
    const container = thumbnailContainerRef.current;
    if (container) {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 20
      ) {
        setDisplayedPhotos((prevPhotos) => [...prevPhotos, ...photos]);
      }
    }
  }, []);

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Handle photo selection and add direction for animation
  const handleSelectPhoto = useCallback(
    (photo, index) => {
      if (index !== selectedIndex) {
        setDirection(index > selectedIndex ? 1 : -1); // Set direction for animation
        setSelectedPhoto(photo);
        setSelectedIndex(index);

        // Play the shutter sound when a new photo is selected
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Reset sound to the beginning
          audioRef.current.play(); // Play shutter sound
        }
      }
    },
    [selectedIndex]
  );

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - thumbnailContainerRef.current.offsetLeft);
    setScrollLeft(thumbnailContainerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - thumbnailContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Faster scrolling
      thumbnailContainerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Photo transition variants with direction
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row">
      <div className="relative w-full md:w-3/4 h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={selectedPhoto}
            src={selectedPhoto}
            alt="Selected Photo"
            className="absolute w-full h-full object-cover rounded-3xl shadow-lg"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 20 }, // Reduced damping for faster response
              opacity: { duration: 0.15 }, // Faster opacity transition
            }}
          />
        </AnimatePresence>
      </div>

      <motion.div
        className="w-full md:w-1/4 h-1/4 md:h-full flex md:flex-col overflow-x-auto md:overflow-y-auto justify-start items-center"
        ref={thumbnailContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayedPhotos.map((photo, index) => {
          const scale = selectedIndex === index ? 1.2 : 1;

          return (
            <motion.div
              key={photo}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectPhoto(photo, index)}
              className={`flex-shrink-0 cursor-pointer m-2 ${
                selectedIndex === index ? "border-4 border-indigo-500" : ""
              }`}
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.2s ease", // Faster transition
              }}
            >
              <img
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover rounded-lg shadow-lg transition-all"
                style={{ width: `${scale * 60}px`, height: `${scale * 60}px` }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Shutter sound */}
      <audio ref={audioRef} src="/sounds/shutter.mp3" preload="auto"></audio>
    </div>
  );
};

export default PhotosComponent;