import React from 'react';
import { motion } from 'framer-motion';

const Navigation = ({ items, activeItem, onItemClick }) => {
  return (
    <nav className="relative flex space-x-2 max-w-3xl mx-auto p-3 bg-white/10 backdrop-blur-md dark:bg-black/20 rounded-xl shadow-lg overflow-x-auto border border-white/20 dark:border-white/10">
      {items.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={`relative flex items-center justify-center flex-shrink-0 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
            activeItem === item.id
              ? "text-white"
              : "text-white/70 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeItem === item.id && (
            <motion.div
              className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-lg z-0"
              layoutId="activeBackground"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          <span className="relative z-10">{item.title}</span>
        </motion.button>
      ))}
    </nav>
  );
};

export default Navigation;


import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
import { visit } from 'unist-util-visit';
import readingTime from 'reading-time';
import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from "./rehypePrettyCode";


export function getPosts() {
    return getMDXData(path.join(process.cwd(), 'content/posts'))
  }
const postsDirectory = path.join(process.cwd(), 'posts');

// Ensure the posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
  console.log(`Created posts directory at ${postsDirectory}`);
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, rehypePrettyCodeOptions],
        [rehypeToc, { headings: ['h2', 'h3'], position: 'beforeend'}],
        () => (tree) => {
          visit(tree, 'element', (node) => {
            if (node.tagName === 'pre') {
              node.properties.className = [
                ...(node.properties.className || []),
                'overflow-x-auto',
                'p-4',
                'bg-gray-800',
                'rounded-md',
              ];
            }
            if (node.tagName === 'code') {
              node.properties.className = [
                ...(node.properties.className || []),
                ...rehypePrettyCodeClasses,
              ];
            }
          });
        },
      ],
    },
  });

  const readingTimeResult = readingTime(content);

  return {
    slug,
    frontMatter: {
      ...data,
      readingTime: readingTimeResult.text,
    },
    mdxSource,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}



import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  description: string
  slug: string
  uploaded: string
  tag: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock?.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines?.forEach(line => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key?.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: any) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: any) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function extractTweetIds(content: any) {
  const tweetMatches = content.match(/<StaticTweet\sid="[0-9]+"\s\/>/g)
  return tweetMatches?.map((tweet: any) => tweet.match(/[0-9]+/g)[0]) || []
}

function getMDXData(dir: any) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const tweetIds = extractTweetIds(content)
    return {
      metadata,
      tweetIds,
      content,
    }
  })
}

export function getPosts() {
  return getMDXData(path.join(process.cwd(), 'content/posts'))
}












import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeToc from '@jsdevtools/rehype-toc';
import { visit } from 'unist-util-visit';
import readingTime from 'reading-time';
import { parseISO, isValid } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const dataDirectory = path.join(process.cwd(), 'public/data');

// Ensure the posts and data directories exist
[postsDirectory, dataDirectory].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory at ${dir}`);
  }
});

const rehypePrettyCodeOptions = {
  // ... (keep existing options)
};

const rehypePrettyCodeClasses = [
  // ... (keep existing classes)
];

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypePrettyCode, rehypePrettyCodeOptions],
        [rehypeToc, { headings: ['h2', 'h3'], position: 'beforeend'}],
        () => (tree) => {
          visit(tree, 'element', (node) => {
            if (node.tagName === 'pre') {
              node.properties.className = [
                ...(node.properties.className || []),
                'overflow-x-auto',
                'p-4',
                'bg-gray-800',
                'rounded-md',
              ];
            }
            if (node.tagName === 'code') {
              node.properties.className = [
                ...(node.properties.className || []),
                ...rehypePrettyCodeClasses,
              ];
            }
          });
        },
      ],
    },
  });

  const readingTimeResult = readingTime(content);

  return {
    slug,
    frontMatter: {
      ...data,
      readingTime: readingTimeResult.text,
    },
    mdxSource,
  };
}

export function getAllPostSlugs() {
  // ... (keep existing function implementation)
}

export async function getAllPosts() {
  // ... (keep existing function implementation)
}

export function getAllTags(posts) {
  // ... (keep existing function implementation)
}

export async function getPostsByTag(tag) {
  // ... (keep existing function implementation)
}

export function slugify(str) {
  // ... (keep existing function implementation)
}

// New function to generate static data
export async function generateStaticData() {
  const allPosts = await getAllPosts();
  const allTags = getAllTags(allPosts);

  const staticData = {
    posts: allPosts.map(post => ({
      slug: post.slug,
      frontMatter: post.frontMatter,
      toc: post.toc,
    })),
    tags: allTags,
  };

  const staticDataPath = path.join(dataDirectory, 'blog-data.json');
  fs.writeFileSync(staticDataPath, JSON.stringify(staticData, null, 2));
  console.log(`Static blog data generated at ${staticDataPath}`);
}

// Updated getStaticProps function
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  
  // Read the static data instead of fetching all posts
  const staticDataPath = path.join(dataDirectory, 'blog-data.json');
  const staticData = JSON.parse(fs.readFileSync(staticDataPath, 'utf8'));

  return {
    props: {
      postData,
      allPosts: staticData.posts,
      allTags: staticData.tags,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

// Run this function during the build process
generateStaticData();

import React from 'react';

function MyComponent({ tocData }) {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {tocData.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';

function MyComponent({ tocData }) {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {tocData.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getPostData(slug) {
  // ... other code

  const mdxSource = await serialize(content, {
    // ... other options

    rehypeToc: {
      // ... other options
      customizeTOC: (toc) => {
        const tocData = toc;

        // Customize the TOC data structure here
        const customTocData = tocData.map((item) => ({
          id: item.id,
          title: item.text,
          // Add any custom properties you need
          level: item.level,
          url: `#${item.id}`, // Create links using the ID
        }));

        return customTocData;
      },
    },
  });

  const tocData = mdxSource.toc; // Store the customized TOC data

  // ... rest of the function
}


import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataDirectory = path.join(process.cwd(), 'public/data');
const postsDirectory = path.join(dataDirectory, 'posts');

// Ensure directories exist
[dataDirectory, postsDirectory].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory at ${dir}`);
  }
});

export async function generateStaticData() {
  const allPosts = await getAllPosts();
  const allTags = getAllTags(allPosts);

  // Generate tags data
  const tagsData = allTags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.frontMatter.tag.includes(tag)).map(post => post.slug);
    return acc;
  }, {});

  // Generate posts metadata
  const postsMetadata = allPosts.map(post => ({
    id: post.frontMatter.id || uuidv4(),
    slug: post.slug,
    title: post.frontMatter.title,
    description: post.frontMatter.description,
    tags: post.frontMatter.tag,
    publishDate: post.frontMatter.uploaded,
  }));

  // Write tags data
  fs.writeFileSync(
    path.join(dataDirectory, 'tags.json'),
    JSON.stringify(tagsData, null, 2)
  );

  // Write posts metadata
  fs.writeFileSync(
    path.join(dataDirectory, 'posts-metadata.json'),
    JSON.stringify(postsMetadata, null, 2)
  );

  // Generate individual post files
  allPosts.forEach(post => {
    const postData = {
      content: post.mdxSource,
      toc: post.toc,
    };
    fs.writeFileSync(
      path.join(postsDirectory, `${post.slug}.json`),
      JSON.stringify(postData, null, 2)
    );
  });

  console.log(`Static blog data generated in ${dataDirectory}`);
}







