import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Verified } from '../Ui/Verified';
import { X, Github, Linkedin, Instagram, Mail, Discord } from '../Ui/Icons';
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import DiscordStatus from './Status';

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

const ProfileImage = ({ imageUrl, isLoading }) => (
  <div className="relative flex items-center justify-center w-[100px] h-[100px]">
    {isLoading ? (
      <Skeleton className="w-[100px] h-[100px] rounded-xl" />
    ) : (
      <>
        <Image
          src={imageUrl}
          quality={50}
          width={100}
          height={100}
          className="absolute rounded-xl object-cover blur-lg opacity-50"
          alt="Blurred background of Ignas"
          priority={true}
        />
        <Image
          src={imageUrl}
          quality={95}
          width={90}
          height={90}
          className="not-prose inline-block z-[5] h-24 w-24 rounded-xl object-cover saturate-0 contrast-125 border border-[#DADADA] dark:border-[#333] hover:h-32 hover:w-32 hover:saturate-100 hover:contrast-100 hover:rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          alt="a cute photo of Ignas"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        />
      </>
    )}
  </div>
);

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatarUrl = await DiscordStatus.getAvatarUrl();
        setAvatar(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const imageUrl = avatar || "/images/ignas_image.jpg";

  return (
    <div className="bg-transparent text-foreground">
      <div className="flex items-center space-x-4 mb-4">
        <ProfileImage imageUrl={imageUrl} isLoading={isLoading} />
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

