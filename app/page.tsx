import { getAllPosts } from '@/lib/supabaseFunctions';
import { Posts } from './components/Posts';
import { notFound } from 'next/navigation';

export default async function Home() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    notFound();
  }
  return (
    <section>
      <h1 className="text-3xl pb-6">記事一覧</h1>
      <Posts postsData={posts} />
    </section>
  );
}
