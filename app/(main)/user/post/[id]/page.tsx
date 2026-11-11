import { PostContent } from '@/features/post/components/PostContent';
import { PostActions } from '@/features/post/components/PostActions';
import { GetPostByIdResult } from '@/features/post/types';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

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

  return (
    <div className="max-w-3xl mt-12 mb-16 mx-auto px-4">
      <PostActions post={getPostByIdResult.data}>
        <PostContent post={getPostByIdResult.data} />
      </PostActions>
    </div>
  );
}
