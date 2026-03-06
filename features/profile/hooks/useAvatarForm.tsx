import { createBrowserSupabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAvatarForm = ({ user }: { user: User }) => {
  const supabase = createBrowserSupabase();
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState('');
  const router = useRouter();

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
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
    router.refresh();
  };

  return { handleUploadStrage, handleSubmit };
};
