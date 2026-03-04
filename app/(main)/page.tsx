import { getPublicPosts, searchPublicPosts } from '@/lib/supabaseFunctions';
import { Posts } from '@/features/Posts/components/Posts';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PostData } from '../types';

export const revalidate = 3600;

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const supabase = await createClient();

  const fetchfilteredPosts = async () => {
    const query: string = (await searchParams)?.query || '';
    if (!query) {
      return await getPublicPosts(supabase);
    } else {
      return await searchPublicPosts(supabase, query);
    }
  };
  const posts: PostData[] | null = await fetchfilteredPosts();

  if (!posts) {
    notFound();
  } else if (posts.length === 0) {
    return (
      <p className="text-center mt-12">記事が見つかりませんでした... 🙏</p>
    );
  }
  return (
    <section className="max-w-3xl mx-auto mt-12 mb-16 px-4">
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <Posts postsData={posts} />
    </section>
  );
}
