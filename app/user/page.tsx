import Link from 'next/link';
import { Profile } from '../components/Profile';
import { createClient } from '@/lib/supabase/server';
import { PostData } from '../types';
import { getCurrentUser, getUserPosts } from '@/lib/supabaseFunctions';
import { Posts } from '../components/Posts';
import { User } from '@supabase/supabase-js';
import { ManagePostsSearch } from '../components/ManagePostsSearch';

export default async function MyPage() {
  const supabase = await createClient();

  // 現在のユーザー情報を取得
  const user: User = await getCurrentUser(supabase) as User;

  // ユーザーが書いた記事を取得する
  const posts: PostData[] | null = await getUserPosts(supabase, user.id);

  return (
    <div className="max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className='flex gap-12'>
        <div className='w-64 shrink-0'>
          <Profile userId={user.id} />
          <ul className='mt-9'>
            <li>
              <Link
                href="/user/settings/profile"
                className="bg-gray-700 text-white px-4 py-2.5 rounded-md hover:bg-gray-500 block text-center"
              >
                プロフィール編集 →
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex-auto'>
          <ManagePostsSearch />
          {posts && posts.length > 0 ? <Posts postsData={posts} manage={true} /> : <p className='text-center'>記事がまだありません</p>}
        </div>
      </div>
    </div>
  );
}
