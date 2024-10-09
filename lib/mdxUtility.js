import path from 'path';
import fs from 'fs/promises';
import { metadata } from '@/app/layout';

const dataDirectory = path.join(process.cwd(), 'public/data');

async function loadBlogData() {
  try {
    const filePath = path.join(dataDirectory, 'blog-data.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading blog data: ${error}`);
    return { posts: [], tags: {} };
  }
}

export async function getAllPosts() {
  const { posts } = await loadBlogData();
  return posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

export async function getAllTags() {
  const { tags } = await loadBlogData();
  return Object.keys(tags);
}

export async function getPostsByTag(tag) {
  const { posts, tags } = await loadBlogData();
  const slugsForTag = tags[tag] || [];
  return posts.filter(post => slugsForTag.includes(post.slug));
}

export async function getPostsByDateRange(startDate, endDate) {
  const { posts } = await loadBlogData();
  return posts.filter(post => {
    const publishDate = new Date(post.publishDate);
    return !isNaN(publishDate) && publishDate >= startDate && publishDate <= endDate;
  });
}

export async function searchPosts(query) {
  const { posts } = await loadBlogData();
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title?.toLowerCase().includes(lowercaseQuery) ||
    post.description?.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getPaginatedPosts(page = 1, pageSize = 10) {
  const allPosts = await getAllPosts();
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return allPosts.slice(startIndex, endIndex);
}

export async function getPostData(slug) {
  const fullPath = path.join(dataDirectory, `${slug}.json`);
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const postData = JSON.parse(fileContents);
    
    return postData;
  } catch (error) {
    console.error(`Error loading post data for slug: ${slug}`, error);
    return null;
  }
}

export async function getLatestPosts(count = 3) {
  const { posts } = await loadBlogData();
  
  // Sort posts by publishDate in descending order
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.publishDate);
    const dateB = new Date(b.publishDate);
    return dateB - dateA;
  });

  // Return the latest 'count' number of posts
  return sortedPosts.slice(0, count);
}

export async function getPostDataBySlug(slug) {
  const { posts } = await loadBlogData();
  const postMetadata = posts.find(post => post.slug === slug);
  
  if (!postMetadata) {
    return null;
  }


  const postData = await getPostData(slug);
  
  if (!postData) {
    return null;
  }

  const currentIndex = posts.findIndex(post => post.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const relatedPosts = posts
    .filter(post => {
      if (post.slug === slug) return false;
      return post.tags.some(tag => postMetadata.tags.includes(tag));
    })
    .slice(0, 3);

  return {
    toc: postData.tableOfContents,
    data: postData.metadata,
    content: postData.content,
    prevPost,
    nextPost,
    relatedPosts
  };
}