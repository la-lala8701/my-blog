'use client';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { ProfileData } from '@/app/types';
import { UserAvatar } from '@/app/components/Profile/UserAvatar';
import { createBrowserSupabase } from '@/lib/supabase/client';

export const AvatarSettings = ({
  user,
  profiles,
}: {
  user: User;
  profiles: ProfileData;
}) => {
  const supabase = createBrowserSupabase();
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState('');

  // supabase strageに古い画像があれば画像名を取得する関数
  const getOldImageName = async (userId: string) => {
    const { data, error } = await supabase.storage
      .from('myblog-user-assets')
      .list(`profiles/${userId}/`, { limit: 1 });

    if (error) {
      console.error('画像取得エラー:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data[0].name; // 最初の画像名を返す
    }

    return null; // 画像が存在しない場合
  };

  // supabase strageに格納されている古い画像を削除する関数
  const deleteOldImage = async (filePath: string) => {
    const { error: deleteError } = await supabase.storage
      .from('myblog-user-assets')
      .remove([filePath]);

    if (deleteError) {
      console.error('削除エラー:', deleteError.message);
      // 削除エラーは致命的ではないので、続行します
    }
  };

  // Supabase Storageに画像アップロードする関数
  const uploadImageToStorage = async (file: File, filePath: string) => {
    const { error: uploadError } = await supabase.storage
      .from('myblog-user-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('アップロードエラー:', uploadError.message);
      return;
    }
  };

  // アップロードしたファイルのパブリックURLを取得する関数
  const getPublicUrl = async (filePath: string) => {
    const { data: urlData } = supabase.storage
      .from('myblog-user-assets')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  // ファイルアップロード時のハンドラー
  const handleUploadStrage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // 現在のユーザー情報が取得できなかった場合
    if (!user) {
      console.error('ユーザーが取得できません');
      return;
    }

    const file = e.target.files[0];
    const filePath = `profiles/${user.id}/${file.name}`;
    setFile(file);
    setFilePath(filePath);
  };

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 現在のユーザー情報が取得できなかった場合
    if (!user) {
      console.error('ユーザーが取得できません');
      return;
    }

    // 古い画像があれば削除する
    const oldImageName = await getOldImageName(user.id);
    if (oldImageName) {
      const oldFilePath = `profiles/${user.id}/${oldImageName}`;
      await deleteOldImage(oldFilePath);
    }

    // 新しい画像をアップロードする
    if (!file || !filePath) {
      console.error('アップロードするファイルが選択されていません');
      return;
    }
    await uploadImageToStorage(file, filePath);

    // アップロードしたファイルのパブリックURLを取得
    const url = await getPublicUrl(filePath);

    // プロフィールテーブルに画像URLを保存する処理
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: url })
      .eq('id', user.id);

    if (updateError) {
      console.error('プロフィール更新エラー:', updateError.message);
      return;
    }
    alert('プロフィール画像が更新されました');
  };

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-center text-2xl">プロフィール画像の変更</h1>
      {/* ここにプレビュー画像を表示する */}
      <div className="flex justify-center my-4 w-32 h-32 rounded-full mx-auto">
        <UserAvatar profiles={profiles} avatarSize={128} />
      </div>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label
          className="block mb-2.5 text-sm font-medium"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="file:bg-zinc-200 file:py-2 file:px-4 file:me-4 file:cursor-pointer cursor-pointer border border-zinc-500 text-sm rounded-xl focus:ring-sky-500 focus:ring-2 focus:border-0 block w-full shadow-xs placeholder:text-body"
          type="file"
          name="avatar"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => handleUploadStrage(e)}
          required
        />
        <p className="mt-1 text-sm text-zinc-500 mb-2">
          ※ PNG or JPG (MAX. 5MB, 推奨サイズ 720x720px)
        </p>
        <button
          className="ml-auto block px-4 py-2 rounded-md border cursor-pointer border-zinc-800 bg-zinc-800 text-white hover:bg-white hover:text-zinc-800"
          type="submit"
        >
          保存
        </button>
      </form>
    </div>
  );
};
