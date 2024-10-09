import React from 'react';
import Link from 'next/link';
import LikeButton from './likeButton';
import ShareButton from './shareButton';

export const BlogFooter = ({ currentPost, prevPost, nextPost }) => {
  if (!currentPost || !currentPost.slug) {
    return null;
  }

  return (
    <footer className="mt-12 max-w-3xl border-t border-gray-200 dark:border-gray-700 pt-8">
      <div className="flex justify-between items-center mb-8">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Previous: {prevPost.title}</span>
          </Link>
        ) : <div></div>}
        
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
            <span className="text-sm font-medium">Next: {nextPost.title}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <LikeButton postId={currentPost.slug} />
          <ShareButton
            postUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${currentPost.slug}`}
            postTitle={currentPost.title}
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Published on {new Date(currentPost.publishDate).toLocaleDateString()}
        </div>
      </div>
    </footer>
  );
};