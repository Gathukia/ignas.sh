import Image from "next/image";
import { motion } from "framer-motion";
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
  const avatar = DiscordStatus.getAvatarUrl();
  console.log("avatar=>",avatar);

  return (
    <div className="relative flex items-center justify-center w-[100px] h-[100px]">
      {/* Blurred background image slightly larger than the foreground image */}
      <Image
        src={avatar || "/images/ignas_image.jpg"}
        quality={50}
        width={100}
        height={100}
        className="absolute rounded-xl object-cover blur-lg opacity-50"
        alt="Blurred background of Ignas"
      />

      {/* Foreground profile image */}
      <Image
        src={avatar || "/images/ignas_image.jpg"}
        quality={95}
        width={90}
        height={90}
        priority={true}
        className="not-prose inline-block z-[5] h-24 w-24 rounded-xl object-cover saturate-0 contrast-125 border border-[#DADADA] dark:border-[#333] hover:h-32 hover:w-32 hover:saturate-100 hover:contrast-100 hover:rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        alt="a cute photo of Ignas"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
      />
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