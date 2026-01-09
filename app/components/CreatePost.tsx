'use client';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { PostData } from '@/app/types';
import { addPost } from '@/lib/supabaseFunctions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Inputs = {
  title: string;
  content: string;
};

export const CreatePost = ({
  display_name,
}: {
  display_name: string | null;
}) => {
  const supabase = createClient();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
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

      // 表示名が設定されていない時の処理
      if (!display_name || display_name.length === 0) {
        alert('プロフィール設定から、表示名を設定してください。');
        return;
      }

      // 新規記事データ
      const newPost: PostData = {
        id,
        user_id: user.id,
        title: data.title,
        content: data.content,
        author: display_name,
        created_at: new Date().toISOString(),
        is_published: false,
      };

      // 記事をpostsテーブルに挿入する
      await addPost(supabase, newPost);
      // フォームをリセット
      reset();
      // 投稿した記事ページへリダイレクト
      router.push(`/user/post/${id}`);
    } catch (error) {
      console.error('予期せぬエラー', error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* タイトル */}
      <div>
        <label className="block mb-1">
          タイトル
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {errors.title && <span>入力してください</span>}
          </span>
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 w-full"
          {...register('title', { required: true })}
        />
      </div>
      {/* 内容 */}
      <div>
        <label className="block mb-1">
          内容
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {errors.content && <span>入力してください</span>}
          </span>
        </label>
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full field-sizing-content min-h-[200px]"
          placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
          {...register('content', { required: true })}
        ></textarea>
      </div>
      <div className="text-right">
        <Link href="/user" className="text-gray-500 hover:underline">
          キャンセル
        </Link>
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          作成
        </button>
      </div>
    </form>
  );
};
