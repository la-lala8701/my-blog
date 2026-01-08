import Link from 'next/link';
import { Logout } from './LogOut';
import Avatar from 'boring-avatars';
import { useState } from 'react';

export const AuthHeader = ({
  displayName,
  userEmail,
}: {
  displayName: string | undefined;
  userEmail: string | undefined;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <nav>
        <ul className="flex items-center">
          <li>
            <Link
              className="px-4 py-3 bg-green-300 rounded-md hover:bg-green-400"
              href="/create"
            >
              記事作成
            </Link>
          </li>
          <li
            onClick={() => setShowMenu(true)}
            className="ml-8 w-11 h-11 rounded-full cursor-pointer"
          >
            <Avatar name={displayName} size={44} variant="beam" />
          </li>
        </ul>
      </nav>
      {/* メニュー */}
      {showMenu ? (
        <div className='fixed w-full h-full top-0 left-0 z-10' onClick={(e) => e.target === e.currentTarget && setShowMenu(false)}>
          <div className="w-64 absolute top-18 right-6 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10">
            <div className="flex flex-col gap-2 items-center mx-2">
              <div className="w-16 h-16 rounded-full shrink-0">
                <Avatar name={displayName} size={64} variant="beam" />
              </div>
              <div className="text-lg font-semibold truncate w-full text-center">{displayName}</div>
              <div className="text-gray-600 truncate w-full text-center">{userEmail}</div>
            </div>
            <dl className="mt-8">
              <div>
                <dt className="text-gray-500 text-sm p-1">管理</dt>
                <dd>
                  <Link href="/user" className="p-4 block hover:bg-gray-100">
                    マイページ
                  </Link>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="text-gray-500 text-sm p-1">設定</dt>
                <dd>
                  <ul>
                    <li>
                      <Link
                        href="/user/settings/profile"
                        className="p-4 block hover:bg-gray-100"
                      >
                        プロフィール
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/settings/password"
                        className="p-4 block hover:bg-gray-100"
                      >
                        パスワード
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/settings/email"
                        className="p-4 block hover:bg-gray-100"
                      >
                        メールアドレス
                      </Link>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
            <hr className="my-4 border-gray-300" />
            <Logout />
          </div>
        </div>
      ) : null}
    </div>
  );
};
