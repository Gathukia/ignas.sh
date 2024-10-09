import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { v4 as uuidv4 } from 'uuid';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const dataDirectory = path.join(process.cwd(), 'public/data');

// Ensure the posts and data directories exist
[postsDirectory, dataDirectory].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory at ${dir}`);
  }
});

function generateTableOfContents(content) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2];
    const id = title.toLowerCase().replace(/[^\w]+/g, '-');

    toc.push({ level, title, id, url: `#${id}` });
  }

  return toc;
}

export async function generateStaticData() {
  const mdxFiles = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'));
  const allPosts = [];
  const allTags = new Set(['popular', 'latest', 'top']); // Add default tags

  for (const mdxFile of mdxFiles) {
    const fullPath = path.join(postsDirectory, mdxFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = path.parse(mdxFile).name;
    const readingTimeResult = readingTime(content);
    const toc = generateTableOfContents(content);

    // Ensure tags is always an array
    const tags = Array.isArray(data.tag) ? data.tag : data.tag ? [data.tag] : [];

    const postMetadata = {
      id: data.id || uuidv4(),
      slug: slug,
      title: data.title,
      description: data.description,
      tags: tags,
      publishDate: data.publishDate || data.uploaded || new Date().toISOString(),
      readingTime: readingTimeResult.text,
      ...data
    };

    const postData = {
      metadata: postMetadata,
      tableOfContents: toc,
      content: content
    };

    // Save individual post data as JSON
    const jsonFileName = `${slug}.json`;
    fs.writeFileSync(
      path.join(dataDirectory, jsonFileName),
      JSON.stringify(postData, null, 2)
    );

    allPosts.push(postMetadata);
    tags.forEach(tag => allTags.add(tag));

    console.log(`Processed and saved ${jsonFileName}`);
  }

  // Sort posts by publish date
  allPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // Generate tags data
  const tagsData = Array.from(allTags).reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.tags.includes(tag)).map(post => post.slug);
    return acc;
  }, {});

  // Add special tags
  tagsData['latest'] = allPosts.slice(0, 5).map(post => post.slug); // 5 most recent posts
  tagsData['popular'] = allPosts.sort(() => 0.5 - Math.random()).slice(0, 5).map(post => post.slug); // 5 random posts (simulating popularity)
  tagsData['top'] = allPosts.sort(() => 0.5 - Math.random()).slice(0, 3).map(post => post.slug); // 3 random posts (simulating top posts)

  // Combine metadata and tags into a single object
  const combinedData = {
    posts: allPosts,
    tags: tagsData
  };

  // Write combined data
  fs.writeFileSync(
    path.join(dataDirectory, 'blog-data.json'),
    JSON.stringify(combinedData, null, 2)
  );

  console.log(`Static blog data generated in ${dataDirectory} and ${postsDirectory}`);
}

export async function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async ({ params: { slug } }) => {
      const postData = await getPostData(slug);
      return postData;
    })
  );

  return posts
    .filter(post => post !== null)
    .sort((a, b) => new Date(b.frontMatter.uploaded) - new Date(a.frontMatter.uploaded));
}

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        return fs.statSync(filePath).isFile() && fileName.endsWith('.mdx');
      })
      .map((fileName) => ({
        params: {
          slug: path.parse(fileName).name,
        },
      }));
  } catch (error) {
    console.error(`Error reading post slugs: ${error.message}`);
    return [];
  }
}


// Run this function during the build process
generateStaticData();