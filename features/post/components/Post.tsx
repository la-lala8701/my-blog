// 使っていないコンポーネント
import { PostContent } from '@/features/post/components/PostContent';
import { GetPostByIdResult, PostData } from '@/features/post/types';
import { getPostById } from '@/lib/supabaseFunctions';
import { Profile } from '@/features/profile/components/Profile';
import { createClient } from '@/lib/supabase/server';

export const Post = async ({ pageId }: { pageId: string }) => {
  const supabase = await createClient();
  const getPostByIdResult: GetPostByIdResult = await getPostById(supabase, pageId);
  
  if (!getPostByIdResult.success) {
    let errorMessage = '';

    if (getPostByIdResult.code === 'READ_ERROR') {
      errorMessage = '記事の取得に失敗しました。';
    } else if (getPostByIdResult.code === 'NOT_FOUND') {
      errorMessage = '記事が見つかりません。';
    } else {
      errorMessage = '予期せぬエラーが発生しました。';
    }

    return <div className="text-center text-red-600">{errorMessage}</div>;
  }

  const getPost: PostData = getPostByIdResult.data;

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
