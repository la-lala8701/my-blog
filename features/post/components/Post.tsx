// 使っていないコンポーネント
import { PostContent } from '@/features/post/components/PostContent';
import { PostData } from '@/features/post/types';
import { getPostById } from '@/lib/supabaseFunctions';
import { Profile } from '@/features/profile/components/Profile';
import { createClient } from '@/lib/supabase/server';

export const Post = async ({ pageId }: { pageId: string }) => {
  const supabase = await createClient();
  const getPost: PostData = await getPostById(supabase, pageId);

  return (
    <div className="mx-auto max-w-5xl mt-12 flex flex-col gap-10">
      <div className="max-w-3xl flex-1">
        <PostContent post={getPost} />
      </div>
      <div className="w-56 sticky top-12 h-fit">
        <Profile userId={getPost.user_id} />
      </div>
    </div>
  );
};
