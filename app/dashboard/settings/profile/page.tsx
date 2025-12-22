'use client';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import Avatar from 'boring-avatars';
import {
  getProfileById,
  supabase,
  updateProfileById,
} from '@/lib/supabaseFunctions';
// import { useState } from 'react';
// import { User } from '@supabase/supabase-js';

type ProfileData = {
  display_name: string;
  description: string;
};

const currentUserId = async () => {
  // 現在のユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    alert('ログインしていません');
    return;
  }
  return user.id;
};


const loginUserName = async () => {
  try {
    // ユーザーIDを取得
    const userId: string | undefined = await currentUserId();
    if (!userId) {
      alert('ユーザーIDを取得できませんでした')
      return;
    }

    // プロフィールに設定された表示名の取得
    const { desplay_name } = await getProfileById(userId);
    // setDisplayName(desplay_name);
    return desplay_name;
  } catch (error) {
    console.error('予期せぬエラー', error);
  }
};
loginUserName();

export default function ProfilePage() {
  // const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      // 現在のユーザー情報を取得
      const userId: string | undefined = await currentUserId();
      if (!userId) {
        alert('ユーザーIDを取得できませんでした')
        return;
      }
      // データを更新
      console.log(data);
      await updateProfileById(userId, data.display_name, data.description);
    } catch (error) {
      console.error('予期せぬエラー', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール設定</h1>
      {/* アイコン画像 */}
      <div className="w-32 h-32 block mx-auto rounded-full">
        <Avatar name={desplay_name} size={128} variant="beam" />
      </div>
      <input
        type="file"
        name="icon"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => console.log(e.target.files)}
      />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            表示名
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {errors.display_name && <span>必須項目です</span>}
            </span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="表示名を入力してください"
            defaultValue={displayName}
            {...register('display_name', { required: true })}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            自己紹介文
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows={4}
            placeholder="自己紹介文を入力してください"
            {...register('description')}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block ml-auto cursor-pointer"
        >
          保存
        </button>
      </form>
      <div className="mt-8">
        <Link
          href="/dashboard/settings"
          className="text-blue-500 hover:underline"
        >
          ← 設定ページに戻る
        </Link>
      </div>
    </div>
  );
}
