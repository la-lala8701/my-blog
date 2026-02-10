import { getPublicPosts } from '@/lib/supabaseFunctions';
import { Posts } from '@/app/components/Posts';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Home({searchParams}: {searchParams?: { query?: string; page?: string}}) {
  const supabase = await createClient();
  // const posts = await getPublicPosts(supabase);

  const fetchfilteredPosts = async () => {
    const query: string = (await searchParams)?.query || '';
    if (!query) {
      return await getPublicPosts(supabase);
    } else {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .eq('is_published', true)
      if (error) throw error;
      return data;
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
