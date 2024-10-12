"use client"
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const SpotifyVisualizer = ({ isPlaying, albumImageUrl }) => {
  const numSticks = 100;
  const animationRef = useRef();
  const sticksRef = useRef([]);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(0);

  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      setContainerSize(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateContainerSize();
    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateContainerSize]);

  const getStickType = useCallback((index) => {
    const patternLength = 12;
    const position = index % patternLength;
    if (position === 0) return 'long';
    if (position === 5) return 'short';
    return 'minute';
  }, []);

  const stickStyles = useMemo(() => {
    return Array.from({ length: numSticks }, (_, i) => {
      const stickType = getStickType(i);
      const baseRadius = containerSize * 0.35;
      let baseHeight, width;

      if (stickType === 'long') {
        baseHeight = baseRadius * 0.4;
        width = containerSize * 0.01;
      } else if (stickType === 'short') {
        baseHeight = baseRadius * 0.3;
        width = containerSize * 0.01;
      } else {
        baseHeight = baseRadius * 0.2;
        width = containerSize * 0.005;
      }

      return {
        baseHeight,
        width,
        transform: `rotate(${i * (360 / numSticks)}deg) translateY(-${baseRadius}px)`,
        className: `absolute origin-bottom transition-all duration-25 ease-in-out ${
          stickType === 'long' ? 'bg-primary' : stickType === 'short' ? 'bg-secondary' : 'bg-accent'
        }`,
      };
    });
  }, [containerSize, getStickType]);

  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (!isPlaying || !containerRef.current) return;

      if (currentTime - lastTime >= frameInterval) {
        lastTime = currentTime;

        const time = currentTime / 200;
        sticksRef.current.forEach((stick, i) => {
          const { baseHeight } = stickStyles[i];
          const stickType = getStickType(i);
          let amplitude, frequency;

          if (stickType === 'long') {
            amplitude = Math.random() * (containerSize * 0.03) + (containerSize * 0.03);
            frequency = Math.random() * 0.5 + 0.5;
          } else if (stickType === 'short') {
            amplitude = Math.random() * (containerSize * 0.025) + (containerSize * 0.025);
            frequency = Math.random() * 1 + 1;
          } else {
            amplitude = Math.random() * (containerSize * 0.06) + (containerSize * 0.02);
            frequency = Math.random() * 2 + 1;
          }

          const phase = Math.random() * 2 * Math.PI;
          const height = baseHeight + Math.max(0, Math.sin(time * frequency + phase) * amplitude);
          stick.style.height = `${height}px`;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, containerSize, getStickType, stickStyles]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-transparent">
      <div className="relative" style={{ width: '100%', paddingBottom: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full" />
          {containerSize > 0 && stickStyles.map((style, i) => (
            <div
              key={i}
              ref={(el) => (sticksRef.current[i] = el)}
              className={style.className}
              style={{
                height: `${style.baseHeight}px`,
                width: `${style.width}px`,
                transform: style.transform,
                bottom: '50%',
                left: `calc(50% - ${style.width / 2}px)`,
              }}
            />
          ))}
          {containerSize > 0 && (
            <div 
              className="absolute rounded-full outline outline-2 outline-offset-2 outline-foreground top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden z-10"
              style={{
                width: `${containerSize * 0.64}px`,
                height: `${containerSize * 0.64}px`,
              }}
            >
              <motion.img 
                src={albumImageUrl || "/api/placeholder/400/400"} 
                alt="Album cover" 
                className="w-full rounded-full border border-popover-foreground dark:border-muted-foreground dark:border-blur h-full object-cover"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 10, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotifyVisualizer;