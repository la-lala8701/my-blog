import { Posts } from '@/app/components/Posts';
import { PostData } from '@/app/types';
import { createClient } from '@/lib/supabase/server';
import { getUserPosts } from '@/lib/supabaseFunctions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ManagePosts() {
  // 現在のユーザー情報を取得
  const {
    data: { user },
    error,
  } = await (await createClient()).auth.getUser();
  if (error || !user) {
    console.error('認証セッションが不正です');
    return;
  }

  // ユーザーが書いた記事を取得する
  const posts: PostData[] | null = await getUserPosts(user.id);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-right mb-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </p>
      <h1 className="text-4xl font-bold mb-8">投稿一覧</h1>
      <Posts postsData={posts} />
    </div>
  );
}
