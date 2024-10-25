import React from 'react';
import Link from 'next/link';
import { BlogHeader } from './bolgHeader';
import { MainPost } from './mainPost';
import Footer from '@/app/Components/Footer';

const BlogFooter = ({ prevPost, nextPost }) => {
  return (
    <footer className="w-full max-w-2xl mx-auto mt-8 mb-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 pt-6">
      <nav className="flex justify-between items-stretch">
        {/* Previous Post Link */}
        <div className="w-1/2 pr-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group block h-full">
              <div className="flex flex-col h-full justify-between transition-all duration-300 transform group-hover:-translate-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
                  ← Previous
                </span>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {prevPost.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="h-full flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No previous post
              </span>
            </div>
          )}
        </div>

        {/* Next Post Link */}
        <div className="w-1/2 pl-4 text-right">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group block h-full">
              <div className="flex flex-col h-full justify-between transition-all duration-300 transform group-hover:translate-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-300">
                  Next →
                </span>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {nextPost.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="h-full flex items-center justify-end">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                No next post
              </span>
            </div>
          )}
        </div>
      </nav>
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
