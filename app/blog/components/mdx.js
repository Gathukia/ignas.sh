import React, { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import '../../marker.css'

const cn = (...classes) => classes.filter(Boolean).join(' ');

const slugify = (str) => String(str).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const Heading = ({ level, children, className, ...props }) => {
  const slug = slugify(children);
  const HeadingTag = `h${level}`;
  const headingClasses = {
    h1: "mt-12 mb-6 text-xl font-bold text-primary",
    h2: "mt-10 mb-4 text-lg font-bold text-primary",
    h3: "mt-8 mb-3 text-lg font-semibold text-primary",
    h4: "mt-6 mb-2 text-base font-semi-bold text-primary",
  };

  return (
    <HeadingTag id={slug} className={cn(headingClasses[`h${level}`], className)} {...props}>
      {children}
      <a href={`#${slug}`} className="ml-2 text-blue-500 opacity-0 hover:opacity-100 transition-opacity" aria-hidden="true">
        #
      </a>
    </HeadingTag>
  );
};

const CustomLink = ({ href, children, ...props }) => {
  const isInternal = href.startsWith('/') || href.startsWith('#');
  return (
    <Link
      href={href}
      {...props}
      className="text-blue-600 hover:text-blue-800 font-medium no-underline transition-colors"
      {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </Link>
  );
};

const RoundedImage = ({ alt, src, ...props }) => (
  <motion.div
    className="flex flex-col items-center my-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Image
      alt={alt}
      className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      src={src}
      {...props}
    />
    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic text-center">{alt}</p>
  </motion.div>
);

const Callout = ({ emoji, title, children }) => (
  <motion.div
    className="not-prose px-6 py-4 my-8 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
      <span className="text-2xl">{emoji}</span>
      <strong className="text-lg font-semibold">{title}</strong>
    </div>
    <div className="mt-3 text-gray-700 dark:text-gray-300 text-base leading-relaxed">{children}</div>
  </motion.div>
);

const Table = ({ data }) => (
  <div className="overflow-x-auto my-8">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


const MDX = async (props) => (
  <Suspense fallback={<div className="text-center text-lg font-medium text-gray-600 dark:text-gray-400">Loading...</div>}>
    <MDXRemote
      {...props}
      components={{
        h1: (props) => <Heading level={1} {...props} />,
        h2: (props) => <Heading level={2} {...props} />,
        h3: (props) => <Heading level={3} {...props} />,
        h4: (props) => <Heading level={4} {...props} />,
        a: CustomLink,
        p: ({ className, ...props }) => (
          <p className={cn("my-4 font-space-mono text-sm leading-7 text-muted-foreground", className)} {...props} />
        ),
        ul: ({ className, ...props }) => (
          <ul className={cn("my-6 ml-6 list-disc text-base text-gray-700 dark:text-gray-300", className)} {...props} />
        ),
        ol: ({ className, ...props }) => (
          <ol className={cn("my-6 ml-6 list-decimal text-base text-gray-700 dark:text-gray-300", className)} {...props} />
        ),
        li: ({ className, ...props }) => (
          <li className={cn("mt-2 text-sm font-space-mono", className)} {...props} />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn("my-6 pl-6 border-l-4 border-blue-500 italic text-lg text-gray-700 dark:text-gray-300", className)}
            {...props}
          />
        ),
        Image: RoundedImage,
        Table,
        Callout,
        code: ({ className, ...props }) => (
          <code className={cn("px-1 py-0.5 rounded bg-card dark:bg-card text-xs font-mono overflow-hidden", className)} {...props} />
        ),
        pre: ({ className, ...props }) => (
          <pre className={cn("p-4 my-6 rounded-3xl border border-border border-4 bg-card dark:bg-card overflow-hidden", className)} {...props} />
        ),
        ...(props.components || {}),
      }}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { 
              behavior: 'append',
              properties: { className: ['anchor'] }
            }],
            rehypeHighlight,
            [rehypePrettyCode, {
              onVisitLine(node) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node) {
                node.properties.className.push('bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 pl-2');
              },
              onVisitHighlightedWord(node) {
                node.properties.className = ['bg-blue-200 dark:bg-blue-800 rounded px-1 py-0.5'];
              },
            }],
          ],
        },
      }}
    />
  </Suspense>
);

export default MDX;