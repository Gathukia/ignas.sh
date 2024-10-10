import React from 'react';
import { Verified } from '../Ui/Verified';
import ProfileImageLarge from '../Ui/ProfileImage';
import { X, Github, Linkedin, Instagram, Mail } from '../Ui/Icons';

const socialLinks = [
  { name: 'X', Icon: X, url: 'https://x.com' },
  { name: 'GitHub', Icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', Icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Instagram', Icon: Instagram, url: 'https://instagram.com' },
  { name: 'Mail', Icon: Mail, url: 'mailto:example@example.com' },
];

const SocialLink = ({ name, Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-muted-foreground hover:text-foreground transition-colors group relative"
  >
    <span className="relative z-10 md:pr-6">{name}</span>
    <span className="absolute inset-y-0 right-0 w-6 flex items-center justify-center">
      <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:-translate-y-1" />
    </span>
  </a>
);

const Header = () => {
  return (
    <div className="bg-transparent text-foreground">
      <div className="flex items-center space-x-4 mb-4">
        <ProfileImageLarge />
        <div>
          <div className="flex items-center space-x-1">
            <h1 className="text-sm font-bold text-primary">!gnas</h1>
            <Verified className="text-accent" />
          </div>
          <p className="text-xs text-muted-foreground pt-3">
            an Indie hacker building stuff on and off the WEB.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-3 md:space-x-6 flex-wrap">
          {socialLinks.map((link) => (
            <SocialLink key={link.name} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
