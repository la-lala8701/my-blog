'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール設定</h1>
      {/* アイコン画像 */}
      <div className="w-32 h-32 bg-gray-300 block mx-auto rounded-full"></div>
      {/* <p className="text-lg text-gray-700">
        ここでプロフィール情報を編集できます。将来的にはアバターのアップロードやソーシャルリンクの追加などの機能も追加予定です。
      </p> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">表示名</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="表示名を入力してください"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">自己紹介文</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows={4}
            placeholder="自己紹介文を入力してください"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          保存
        </button>
      </form>
      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          ← ダッシュボードに戻る
        </Link>
      </div>
    </div>
  );
}
