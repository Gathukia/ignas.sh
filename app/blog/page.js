import { BackgroundContainer } from '../Ui/Background';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FilteredPosts from './components/filteredPosts';
import { getAllPosts, getAllTags } from '../../lib/mdxUtility';

export const revalidate = 60;

async function getData() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  return {
    posts,
    tags: [...tags],
  };
}

export default async function BlogPage() {
  const { posts, tags } = await getData();
  return (
    <BackgroundContainer contentType="written">
      <div className="flex flex-col min-h-screen bg-scrool bg-background dark:bg-transparent text-foreground lg:pt-14">
        <main className="max-w-3xl mx-auto py-4">
        <div>
      <FilteredPosts initialPosts={posts} initialTags={tags} />
    </div>
        </main>
      </div>
    </BackgroundContainer>
  );
}