import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return 'Date unavailable';
  }
};

const PostCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group relative overflow-hidden rounded-lg bg-secondary transition-all duration-300 hover:shadow-lg dark:bg-[#1E1E1E] dark:shadow-accent/10">
        {post.frontMatter.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.frontMatter.coverImage}
              alt={post.frontMatter.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="mb-2 text-xl font-bold text-primary transition-colors duration-300 group-hover:text-accent">
            {post.frontMatter.title}
          </h2>
          {post.frontMatter.excerpt && (
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              {post.frontMatter.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(post.frontMatter.date)}</span>
            {post.frontMatter.readingTime && (
              <span>{post.frontMatter.readingTime}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PostList = ({ posts }) => (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <PostCard key={post.slug} post={post} />
    ))}
  </div>
);

export default PostList;
