import React from 'react';
import Link from 'next/link';
import { BlogHeader } from './bolgHeader';
import { MainPost } from './mainPost';
import Footer from '@/app/Components/Footer';
import { motion, AnimatePresence } from "framer-motion";
import LikeButton from './likeButton';
import ShareButton from './shareButton';

import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, HeartIcon, ShareIcon } from 'lucide-react';

const BlogFooter = ({ currentPost, prevPost, nextPost }) => {
  if (!currentPost || !currentPost.slug) {
    return null;
  }

  return (
    <footer className="w-full max-w-2xl mx-auto mt-4 mb-4 px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-card text-base font-medium text-muted-foreground">
            End of Article
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`} className="group">
            <div className="relative rounded-lg border border-border border-2 bg-transparent px-6 py-2 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition-all duration-300 ease-in-out hover:scale-105">
              <div className="flex-shrink-0">
                <ChevronLeftIcon className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Previous Article</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{prevPost.title}</p>
              </div>
            </div>
          </Link>
        )}

        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="group">
            <div className="relative rounded-lg border border-border border-2 bg-transparent px-6 py-2 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition-all duration-300 ease-in-out hover:scale-105">
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Next Article</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{nextPost.title}</p>
              </div>
              <div className="flex-shrink-0">
                <ChevronRightIcon className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <LikeButton/>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
            <ShareIcon className="h-5 w-5 mr-2" />
            Share
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <time dateTime={currentPost.publishDate}>
            {new Date(currentPost.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
    </footer>
  );
};

export default function BlogPost({ postData }) {
  const {
    toc,
    data,
    content,
    prevPost,
    nextPost,
    relatedPosts
  } = postData;

  return (
    <article className="mx-auto bg-transparent">
      <BlogHeader
        title={data.title}
        description={data.description}
        publishDate={data.publishDate}
        readingTime={data.readingTime}
        views={data.views}
        likes={data.likes}
        heroImage={data.heroImage}
      />

      <div className="bg-transparent max-w-none mt-4">
        <MainPost 
         mdxSource={content}
         toc = {toc}
        />
      </div>

      <BlogFooter
        currentPost={data}
        prevPost={prevPost}
        nextPost={nextPost}
      />
      <Footer/>
    </article>
  );
}
