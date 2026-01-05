import Link from 'next/link';
import { Profile } from '../components/Profile';
import { createClient } from '@/lib/supabase/server';
import { PostData } from '../types';
import { getUserPosts } from '@/lib/supabaseFunctions';
import { notFound } from 'next/navigation';
import { Posts } from '../components/Posts';

export default async function Dashboard() {
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

  // if (!posts || posts.length === 0) {
  //   notFound();
  // }

  return (
    <div className="max-w-5xl mx-auto pt-12 pb-16">
      <h1 className="text-4xl font-bold mb-8 text-center">マイページ</h1>
      <div className='flex gap-12'>
        <div className='w-64 shrink-0'>
          <Profile userId={user.id} />
          <ul className='mt-9'>
            <li>
              <Link
                href="/user/settings"
                className="bg-gray-700 text-white px-4 py-2.5 rounded-md hover:bg-gray-500 block text-center"
              >
                設定 →
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex-auto'>
          {posts && posts.length > 0 ? <Posts postsData={posts} manage={true} /> : <p className='text-center'>記事がまだありません</p>}
        </div>
      </div>
    </div>
  );
}
