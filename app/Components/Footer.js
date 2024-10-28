"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Clock, Twitter, Github, Instagram, Mail, ChevronUp, BookOpen, Code } from 'lucide-react';
import { Discord } from '../Ui/Icons';
import useSound from 'use-sound';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

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
      <span className="capitalize">{name}</span>
      <Icon className="w-0 h-5 group-hover:w-5 transition-all duration-200 ease-in-out overflow-hidden" />
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
  const [isDropUpOpen, setIsDropUpOpen] = useState(false);
  const pathname = usePathname();

  const [play] = useSound("/sounds/lightswitch.mp3", {
    volume: 0.35,
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

  const toggleDropUp = () => {
    setIsDropUpOpen(!isDropUpOpen);
  };

  const mobileNavItems = [
    { href: "/blog", icon: BookOpen, label: "Blog" },
    { href: "/project", icon: Code, label: "Projects" },
  ];

  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden sm:block mt-auto w-full bg-card border-t border-border py-4">
        <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
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
              className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground focus:outline-none transition-colors duration-200"
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

      {/* Mobile Footer */}
      <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border py-2 z-10">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex flex-col items-center text-muted-foreground hover:text-foreground ${pathname === item.href ? "text-destructive font-semibold" : ""}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
              {pathname === item.href && (
                <motion.div
                  className="absolute bottom-1 w-1.5 h-1.5 bg-destructive rounded-full"
                  layoutId="mobileActiveIndicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            <span className="text-xs">Theme</span>
          </button>
          <button
            onClick={toggleDropUp}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronUp className={`w-6 h-6 transition-transform duration-300 ${isDropUpOpen ? 'rotate-180' : ''}`} />
            <span className="text-xs">More</span>
          </button>
        </div>
      </footer>

      {/* Mobile Drop-up Menu */}
      <AnimatePresence>
        {isDropUpOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="sm:hidden fixed bottom-14 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border py-6 px-6 rounded-t-2xl shadow-lg z-20"
          >
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {["x", "github", "discord", "instagram", "mail"].map((name) => (
                <motion.div key={name} variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}>
                  <SocialLink name={name} url={`https://${name === 'x' ? 'x.com/ignas_edwin' : name === 'github' ? 'github.com/Gathukia' : name === 'discord' ? 'discord.com/users/963425032426635345' : name === 'instagram' ? 'instagram.com/_ignas254' : 'mailto:edwinngugi38@gmail.com'}`} />
                </motion.div>
              ))}
              <motion.a
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                href="https://github.com/Gathukia/ignas.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-5 h-5" />
                <span>Source</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;

