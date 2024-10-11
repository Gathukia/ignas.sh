import React, { useState, useEffect } from 'react';
import { Verified } from '../Ui/Verified';
import ProfileImageLarge from '../Ui/ProfileImage';
import { X, Github, Linkedin, Instagram, Mail, Discord } from '../Ui/Icons';
import { Skeleton } from "@/components/ui/skeleton"

const socialLinks = [
  { name: 'X.com', Icon: X, url: 'https://x.com/ignas_edwin' },
  { name: 'GitHub', Icon: Github, url: 'https://github.com/Gathukia' },
  { name: 'Discord', Icon: Discord, url: 'https://discord.com/users/963425032426635345' },
  { name: 'Instagram', Icon: Instagram, url: 'https://instagram.com/_ignas254' },
  { name: 'Mail', Icon: Mail, url: 'mailto:edwinngugi38@gmail.com' },
];

const SocialLink = ({ name, Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-muted-foreground hover:text-foreground transition-colors group relative"
  >
    <span className="relative z-10 md:pr-6 underline md:no-underline">{name}</span>
    <span className="absolute inset-y-0 right-0 w-6 flex items-center justify-center">
      <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1" />
    </span>
  </a>
);

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-transparent text-foreground">
      <div className="flex items-center space-x-4 mb-4">
        {isLoading ? (
          <Skeleton className="w-16 h-16 rounded-xl" />
        ) : (
          <ProfileImageLarge />
        )}
        <div>
          <div className="flex items-center space-x-1">
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <>
                <h1 className="text-sm font-bold text-primary">!gnas</h1>
                <Verified className="text-accent" />
              </>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="h-4 w-48 mt-3" />
          ) : (
            <p className="text-xs text-muted-foreground pt-3">
              an Indie hacker building stuff on and off the WEB.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex mt-2 space-x-3 md:space-x-4 flex-wrap">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </>
          ) : (
            socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
