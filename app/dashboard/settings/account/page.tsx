import Link from "next/link";

export default function AccountSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">アカウント設定</h1>
      <p className="text-lg text-gray-700">
        ここでアカウント情報を編集できます。将来的にはパスワード変更や二要素認証の設定などの機能も追加予定です。
      </p>
      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          ← ダッシュボードに戻る
        </Link>
      </div>
    </div>
  );
}
