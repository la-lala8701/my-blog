import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">ダッシュボード</h1>
      <p className="text-center mt-4 text-gray-600">
        ようこそ、ダッシュボードへ！ここからブログの管理や設定が行えます。
      </p>
      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full text-gray-100 flex items-center justify-center">
          画像
        </div>
        <div>
          <p className="text-xl font-semibold text-center">
            ユーザー名
          </p>
          <p className="mt-2 text-sm max-w-sm">ここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入ります</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-6 justify-center mt-16">
        <li>
          <Link
            href="/dashboard/posts"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            記事管理 →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings/profile"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            プロフィール設定 →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings/account"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            アカウント設定 →
          </Link>
        </li>
      </ul>
    </div>
  );
}
