import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import DiscordStatus from "../Components/Status";

const Ignas = () => (
  <Image
    src="/images/ignas_image.jpg"
    quality={95}
    width={56}
    height={56}
    priority={true}
    className="rounded-full object-cover"
    alt="a cute photo of Ignas"
  />
);

const IgnasLarge = () => {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        // Assuming DiscordStatus.getAvatarUrl() is an async function
        const avatarUrl = await DiscordStatus.getAvatarUrl();
        setAvatar(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatar();
  }, []);

  const imageUrl = avatar || "/images/ignas_image.jpg";

  return (
    <div className="relative flex items-center justify-center w-[100px] h-[100px]">
      {isLoading ? (
        <Skeleton className="w-[100px] h-[100px] rounded-xl" />
      ) : (
        <>
          {/* Blurred background image */}
          <Image
            src={imageUrl}
            quality={50}
            width={100}
            height={100}
            className="absolute rounded-xl object-cover blur-lg opacity-50"
            alt="Blurred background of Ignas"
            priority={true}
          />

          {/* Foreground profile image */}
          <Image
            src={imageUrl}
            quality={95}
            width={90}
            height={90}
            loading = "eager"
            className="not-prose inline-block z-[5] h-24 w-24 rounded-xl object-cover saturate-0 contrast-125 border border-[#DADADA] dark:border-[#333] hover:h-32 hover:w-32 hover:saturate-100 hover:contrast-100 hover:rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
            alt="a cute photo of Ignas"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
          />
        </>
      )}
    </div>
  );
};

export const ProfileImage = () => {
  return (
    <motion.div
      className="h-full w-full rounded-full overflow-visible"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <Ignas />
    </motion.div>
  );
};

export const ProfileImageLarge = () => {
  return (
    <div>
      <IgnasLarge />
    </div>
  );
};

export default ProfileImageLarge;
