import { BackgroundContainer } from '../../Ui/Background';
import BlogPost from '../components/blogPost';
import { getAllPosts, getPostDataBySlug } from '../../../lib/mdxUtility';

export const revalidate = 60; // Revalidate this page every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

async function getData(slug) {
  const postData = await getPostDataBySlug(slug);
  return { postData };
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const { postData } = await getData(slug);

  if (!postData) {
    return <div>Post not found</div>;
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