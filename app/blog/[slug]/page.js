import { BackgroundContainer } from '../../Ui/Background';
import BlogPost from '../components/blogPost';
import { getAllPosts, getPostDataBySlug } from '../../../lib/mdxUtility';

export const revalidate = 60; // Revalidate this page every 60 seconds

// This function will generate static paths for dynamic routes
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  // Ensure posts have a slug and map correctly
  return posts.map(post => ({ slug: post.slug }));
}

// Fetch the data for a given slug
async function getData(slug) {
  const postData = await getPostDataBySlug(slug);
  
  // Handle missing posts
  if (!postData) {
    return null;
  }

  return { postData };
}

// The dynamic route handler
export default async function PostPage({ params }) {
  const { slug } = params;  // Destructure slug from params

  // Fetch post data using the slug
  const { postData } = await getData(slug) || {};

  // Handle case where post data is not found
  if (!postData) {
    return { notFound: true };  // This triggers a 404 page
  }

  return (
    <BackgroundContainer contentType="written">
      <div className="min-h-screen bg-scrool bg-background dark:bg-transparent text-foreground">
        <main className="mx-auto">
          <BlogPost postData={postData} />
        </main>
      </div>
    </BackgroundContainer>
  );
}