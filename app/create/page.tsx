'use client';
import { UUIDTypes, v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { PostData } from '@/app/types';
import { addPost, getProfileById, supabase } from '@/lib/supabaseFunctions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

type Inputs = {
  title: string;
  content: string;
};

type ProfileData = {
  id: UUIDTypes;
  display_name: string;
  description: string;
};

export default function CreatePage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [displayName, setDisplayName] = useState<string | null>(null);
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

      // ユーザーIDからユーザーのプロフィールデータを取得
      const profileData: ProfileData = await getProfileById(user.id);
      setDisplayName(profileData.display_name);

      // 表示名が設定されていない時の処理
      if (!displayName) {
        alert('プロフィール設定から、表示名を設定してください。');
        return;
      }

      // 新規記事データ
      const newPost: PostData = {
        id,
        user_id: user.id,
        title: data.title,
        content: data.content,
        author: profileData.display_name,
        created_at: new Date().toISOString(),
      };

      // 記事をpostsテーブルに挿入する
      await addPost(newPost);
      // フォームをリセット
      reset();
      // 投稿した記事ページへリダイレクト
      router.push(`/post/${id}`);
    } catch (error) {
      console.error('予期せぬエラー', error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      {!displayName ? (
        <dl className="border text-red-600 rounded-md px-4 py-3 mb-12">
          <dt className="font-bold flex place-items-end gap-2"><span className='inline-block'><WarningIcon/></span><span className='inline-block'>注意</span></dt>
          <dd className='mt-2'>
            記事を作成するには、プロフィール設定から<Link className='text-blue-600 hover:underline' href='/dashboard/settings/profile'>表示名を設定</Link>する必要があります。
          </dd>
        </dl>
      ) : null}
      <h1 className="text-3xl font-bold mb-8 text-center">記事作成</h1>
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
              {errors.title && <span>入力してください</span>}
            </span>
          </label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={10}
            placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
            {...register('content', { required: true })}
          ></textarea>
        </div>
        <div className="text-right">
          <Link href="/" className="text-gray-500 hover:underline">
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
    </div>
  );
}
