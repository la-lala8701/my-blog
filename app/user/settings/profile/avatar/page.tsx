'use client';

import { createClient } from "@/lib/supabase/client";

export default function Avatar() {
  const supabase = createClient();

  const handleUploadStrage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // 現在のユーザー情報を取得
    const { data: { user }} = await supabase.auth.getUser();
    if (!user) {
      console.error('ユーザーが取得できません');
      return;
    }

    const file = e.target.files[0];
    const filePath = `profiles/${user.id}/${file.name}`;

    // Supabase Storageにアップロード
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

    // アップロードしたファイルのパブリックURLを取得
    const { data: urlData, error: urlError } = supabase.storage
      .from('myblog-user-assets')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('URL取得エラー:', urlError.message);
      return;
    }

    const publicUrl = urlData.publicUrl;
    console.log('ファイルのパブリックURL:', publicUrl);

    // ここでpublicUrlをユーザーのプロフィールに保存する処理を追加できます
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-center text-2xl">プロフィール画像の変更</h1>
      {/* ここにプレビュー画像を表示する */}
      <div className="flex justify-center my-4 w-32 h-32 rounded-full mx-auto">
        <img
          src="https://omokaji-web.co.jp/wp-content/uploads/2024/07/catch-1.png"
          alt="プレビュー画像"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <form action="" method="post" encType="multipart/form-data">
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
        <p
          className="mt-1 text-sm text-zinc-500 dark:text-gray-300"
        >
          PNG or JPG (MIN. 250x250px).
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
}
