import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  getCurrentUser,
  getUserPosts,
  searchUserPosts,
} from '@/lib/supabaseFunctions';
import { Posts } from '@/features/posts/components/Posts';
import { User } from '@supabase/supabase-js';
import { ManagePostsSearch } from '@/app/components/elements/Search/ManagePostsSearch';
import { PostData } from '@/features/post/types';
import { Profile } from '@/features/profile/components/Profile';

export default async function MyPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const supabase = await createClient();

  // 現在のユーザー情報を取得
  const user: User = (await getCurrentUser(supabase)) as User;

  const fetchfilteredPosts = async () => {
    // 検索クエリを取得
    const query: string = (await searchParams)?.query || '';
    if (!query) {
      // ユーザーが書いた記事を取得する
      return await getUserPosts(supabase, user.id);
    } else {
      // ユーザーが書いた記事かつ検索した記事を取得する
      return await searchUserPosts(supabase, query, user.id);
    }
  };
  const posts: PostData[] | null = await fetchfilteredPosts();

  return (
    <div className="max-w-5xl mx-auto pt-12 pb-16 px-4">
      <div className="flex gap-12">
        <div className="w-64 shrink-0">
          <Profile userId={user.id} />
          <ul className="mt-9">
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
        <div className="flex-auto">
          <ManagePostsSearch />
          {posts && posts.length > 0 ? (
            <Posts postsData={posts} manage={true} />
          ) : (
            <p className="text-center">記事がまだありません</p>
          )}
        </div>
      </div>
    </div>
  );
}
