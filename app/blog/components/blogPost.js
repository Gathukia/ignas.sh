import React from 'react';
import Link from 'next/link';
import { BlogHeader } from './bolgHeader';
import { MainPost } from './mainPost';
import Footer from '@/app/Components/Footer';

const BlogFooter = ({ prevPost, nextPost }) => {
  return (
    <footer className="w-full max-w-2xl mx-auto mt-4 mb-8 px-4 sm:px-6 lg:px-8 border-t border-white pt-4">
      <nav className="flex justify-between items-stretch h-24 sm:h-32">
        {/* Previous Post Link */}
        <div className="w-1/2 pr-2">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group block">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300">
                ← Previous
              </span>
              <span className="block text-base text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300 line-clamp-2 sm:line-clamp-3">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                No previous post
              </span>
            </div>
          )}
        </div>

        {/* Next Post Link */}
        <div className="w-1/2 pl-2 text-right">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group block">
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-300 transition-colors duration-300">
                Next →
              </span>
              <span className="block text-base text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors duration-300 line-clamp-2 sm:line-clamp-3">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
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
