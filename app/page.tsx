import { getPublicPosts } from '@/lib/supabaseFunctions';
import { Posts } from './components/Posts';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const posts = await getPublicPosts(supabase);

  if (!posts || posts.length === 0) {
    notFound();
  }
  return (
    <section className="max-w-3xl mx-auto mt-12 mb-16 px-4">
      <h1 className="text-3xl pb-6">記事一覧</h1>
      <Posts postsData={posts} />
    </section>
  );
}
