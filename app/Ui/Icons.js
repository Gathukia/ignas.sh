// components/Icons.js
import React from 'react';
import Image from 'next/image';

const IconWrapper = ({ src, alt, className = '' }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className={`w-5 h-5 ${className}`}
    />
  );
};

export const X = ({ className }) => (
  <IconWrapper src="/icons/X.svg" alt="X" className={className} />
);

export const Github = ({ className }) => (
  <IconWrapper src="/icons/Github.svg" alt="GitHub" className={className} />
);

export const Discord = ({ className }) => (
  <IconWrapper src="/icons/Discord.svg" alt="Discord" className={className} />
);

export const Instagram = ({ className }) => (
  <IconWrapper src="/icons/Instagram.svg" alt="Instagram" className={className} />
);

export const Mail = ({ className }) => (
  <IconWrapper src="/icons/Mail.svg" alt="Mail" className={className} />
);

export const Linkedin = ({ className }) => (
  <IconWrapper src="/icons/Linkedin.svg" alt="LinkedIn" className={className} />
);

const Icons = {
  X,
  Github,
  Discord,
  Instagram,
  Mail,
  Linkedin,
};

export default Icons;