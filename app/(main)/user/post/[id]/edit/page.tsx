import { EditPost } from '@/features/post/components/EditPost';
import { GetPostByIdResult } from '@/features/post/types';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id) {
    return <div className="text-center text-red-600">記事IDが見つかりません。</div>;
  }

  // 編集対象の記事データの取得
  const getPostByIdResult: GetPostByIdResult = await getPostById(supabase, id);

  // 記事データの取得に失敗した場合
  if (!getPostByIdResult.success) {
    // エラーコードに応じたエラーメッセージを設定
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
    <div className="mx-auto max-w-5xl py-12 px-4 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">記事編集ページ</h1>
      <EditPost post={getPostByIdResult.data} />
    </div>
  );
};
