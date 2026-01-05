'use client';
import Link from 'next/link';
import { Logout } from './LogOut';
import { useAuth } from '../hooks/useAuth';

export const HeaderNaviItems = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    context: { session },
  } = useAuth();
  console.log(session?.user.id);

  if (session) {
    return (
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
          <Link className="ml-8 w-11 h-11 rounded-full block" href="/user">
            {children}
          </Link>
        </li>
      </>
    );
  }

  return (
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
  );
};
