import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ClockIcon, EyeIcon, HeartIcon } from 'lucide-react';
import { LoadingDots } from './ui/loadingDots';
import { format } from 'date-fns';

export const BlogHeader = ({
  title,
  description,
  publishDate,
  readingTime,
  views,
  likes,
  heroImage,
}) => {
  const formattedDate = publishDate
    ? format(new Date(publishDate), 'MMM dd, yyyy')
    : '';

  return (
    <header className="relative bg-transparent w-full mx-auto pt-5 px-4 sm:px-4 lg:px-4">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.6) 75%,
            rgba(0, 0, 0, 0.7) 80%,
            rgba(0, 0, 0, 0.8) 100%,
            transparent 100%
          ), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          backdropFilter: 'blur(70px)',
          height: 'calc(100% + 250px)',
        }}
      />

      {/* Light Mode Overlay for better visibility */}
      <div
        className="absolute inset-0 z-0 bg-primary/02 opacity-10 linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 105, 235, 1) 100%, transparent 100%), fade -z-10 mt-0 object-cover mix-blend-soft-light pointer-events-none"
        style={{
          height: 'calc(100% + 250px)', // Ensure overlay height matches the background image height
          mixBlendMode: 'lighten',
          opacity: 'var(--light-mode-opacity, 1)', // Allow customization through CSS variables if needed
        }}
      />

      {/* Content */}
      <div className="relative max-w-2xl mx-auto z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span>Back to Blog Posts</span>
        </Link>

        <div className="space-y-4 pl-6">
          <time
            dateTime={publishDate}
            className="block text-sm font-semibold text-popover-foreground uppercase tracking-wider"
          >
            {formattedDate}
          </time>

          {/* Blog title */}
          <h1 className="text-3xl md:text-3xl font-bold text-primary leading-tight mb-2">
            {title}
          </h1>

          {/* Blog description */}
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>{readingTime}</span>
            </div>

            <div className="flex items-center">
              <EyeIcon className="w-4 h-4 mr-1" />
              {views !== undefined ? <span>{views} views</span> : <LoadingDots />}
            </div>

            <div className="flex items-center">
              <HeartIcon className="w-4 h-4 mr-1" />
              {likes !== undefined ? <span>{likes} likes</span> : <LoadingDots />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
