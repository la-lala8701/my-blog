import { PostContent } from '@/features/post/components/PostContent';
import { Profile } from '@/features/profile/components/Profile';
import { GetPostByIdResult, PostData } from '@/features/post/types';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

export const revalidate = 3600;

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const pageId: string = (await params).id;
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
    <div className="flex gap-10 mx-auto max-w-5xl mt-12 mb-16 px-7 md:px-12 flex-col lg:flex-row">
      <div className="w-full lg:max-w-3xl flex-auto">
        <PostContent post={getPost} />
      </div>
      <div className="md:w-56 md:sticky top-12 shrink-0">
        <Profile userId={getPost.user_id} />
      </div>
    </div>
  );
}
