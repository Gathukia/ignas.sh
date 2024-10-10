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
    <header className="relative bg-white dark:bg-transparent w-full mx-auto pt-5 px-4 sm:px-4 lg:px-4">
      {/* Light Mode: Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-0 dark:opacity-0 fade mix-blend-soft-light"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(245, 245, 245, 0.8) 50%,
            rgba(240, 240, 240, 0.95) 80%,
            rgba(252, 251, 245, 0.99) 100%
          ), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(0px)',
          backdropFilter: 'blur(05px)',
          height: 'calc(100% + 60px)',
        }}
      />

      {/* Background Image Overlay (Dark Mode) */}
      <div
        className="absolute inset-0 z-0 opacity-0 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.6) 75%,
            rgba(10, 10, 10, 0.7) 80%,
            rgba(30, 30, 30, 0.9) 89%,
            rgba(45, 45, 45,1) 100%,
            transparent 100%
          ), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          backdropFilter: 'blur(40px)',
          height: 'calc(100% + 500px)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-2xl mx-auto z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mb-4"
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
          <h1 className="text-3xl md:text-3xl font-bold text-primary dark:text-primary leading-tight mb-2">
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