import Link from 'next/link';
import { Profile } from '../components/Profile';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">ダッシュボード</h1>
      <p className="text-center mt-4 text-gray-600">
        ようこそ、ダッシュボードへ！ここからブログの管理や設定が行えます。
      </p>
      <Profile />
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
            href="/dashboard/settings"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            設定 →
          </Link>
        </li>
      </ul>
    </div>
  );
}
