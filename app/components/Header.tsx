'use client';
import Link from 'next/link';
import { Logout } from './LogOut';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { context } = useAuth();

  return (
    <header className="py-6 px-14 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <Link className="p-1.5 text-2xl font-bold" href="/">
          Home
        </Link>
        <nav>
          <ul className="flex items-center">
            {context ? (
              <>
                <li>
                  <Link
                    className="ml-4 px-4 py-3 bg-green-300 rounded-md hover:bg-green-400"
                    href="/create"
                  >
                    記事作成
                  </Link>
                </li>
                <li className="ml-4">
                  <Logout />
                </li>
                <li>
                  <Link
                    className="ml-4 px-4 py-3 bg-yellow-300 rounded-md hover:bg-yellow-400"
                    href="/dashboard"
                  >
                    ダッシュボード
                  </Link>
                </li>
              </>
            ) :(
              <>
                <li>
                  <Link
                    className="px-4 py-3 bg-blue-300 rounded-md hover:bg-blue-400"
                    href="/auth/login"
                  >
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link
                    className="ml-4 px-4 py-3 bg-yellow-300 rounded-md hover:bg-yellow-400"
                    href="/auth/sign-up"
                  >
                    サインアップ
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
