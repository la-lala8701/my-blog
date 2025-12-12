'use client';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { PostData } from '@/app/types';
import { addPost, supabase } from '@/lib/supabaseFunctions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type Inputs = {
  title: string;
  content: string;
};

export default function CreatePage() {
  const { handleSubmit, register, reset } = useForm<Inputs>();
  const router = useRouter();
  const id = uuidv4();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // 現在のユーザー情報を取得
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert('ログインしていません');
        return;
      }

      const displayName = user.user_metadata.display_name

      // 新規記事データ
      const newPost: PostData = {
        id,
        user_id: user.id,
        title: data.title,
        content: data.content,
        author: displayName,
        created_at: new Date().toISOString(),
      };

      // 記事をpostsテーブルに挿入する
      await addPost(newPost);
      // フォームをリセット
      reset();
      // 投稿した記事ページへリダイレクト
      router.push(`/post/${id}`)
    } catch (error) {
      console.error('予期せぬエラー', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">記事作成</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* タイトル */}
        <div>
          <label className="block mb-1">タイトル</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            {...register('title', { required: true })}
          />
        </div>
        {/* 内容 */}
        <div>
          <label className="block mb-1">内容</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={10}
            placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
            {...register('content', { required: true })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          作成
        </button>
        <Link href="/" className="ml-4 text-gray-500 hover:underline">
          キャンセル
        </Link>
      </form>
    </>
  );
}
