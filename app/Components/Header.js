import React from 'react';
import { Twitter, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { Verified } from '../Ui/Verified';
import ProfileImageLarge from '../Ui/ProfileImage';

const socialLinks = [
  { name: 'X', icon: Twitter, url: 'https://x.com' },
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
  { name: 'Mail', icon: Mail, url: 'mailto:example@example.com' },
];

const SocialLink = ({ name, icon: Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
  >
    <span className="md:hidden underline">{name}</span>
    <span className="hidden md:flex items-center space-x-1">
      <span>{name}</span>
      <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
