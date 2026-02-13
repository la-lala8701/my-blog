import { getPublicPosts, searchPosts } from '@/lib/supabaseFunctions';
import { Posts } from '@/app/components/Posts';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Home({searchParams}: {searchParams?: { query?: string; page?: string}}) {
  const supabase = await createClient();

  const fetchfilteredPosts = async () => {
    const query: string = (await searchParams)?.query || '';
    if (!query) {
      return await getPublicPosts(supabase);
    } else {
      return await searchPosts(supabase, query);
    }
  }
  const posts = await fetchfilteredPosts();

  if (!posts || posts.length === 0) {
    notFound();
  }
  return (
    <section className="max-w-3xl mx-auto mt-12 mb-16 px-4">
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <Posts postsData={posts} />
    </section>
  );
}
