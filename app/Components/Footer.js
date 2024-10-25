"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Clock, Twitter, Github, Instagram, Mail } from 'lucide-react';
import { Discord } from '../Ui/Icons';
import useSound from 'use-sound';

const iconMap = {
  x: Twitter,
  github: Github,
  discord: Discord,
  instagram: Instagram,
  mail: Mail,
};

const SocialLink = ({ name, url }) => {
  const Icon = iconMap[name];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="hidden sm:inline capitalize">{name}</span>
      <Icon className="w-5 h-5 inline sm:hidden sm:group-hover:inline" />
    </a>
  );
};

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span className="text-sm">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [play] = useSound("/sounds/lightswitch.mp3", {
    volume: 0.05,
    sprite: {
      on: [0, 300],
      off: [500, 300],
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    play({ id: newTheme === 'dark' ? 'off' : 'on' });
  };

  return (
    <footer className="mt-auto w-full bg-card border-t border-border py-4">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex space-x-4">
          <SocialLink name="x" url="https://x.com/ignas_edwin" />
          <SocialLink name="github" url="https://github.com/Gathukia" />
          <SocialLink name="discord" url="https://discord.com/users/963425032426635345" />
          <SocialLink name="instagram" url="https://instagram.com/_ignas254" />
          <SocialLink name="mail" url="mailto:edwinngugi38@gmail.com" />
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/Gathukia/ignas.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>Source</span>
          </a>
          <ClockDisplay />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;