import Link from 'next/link';
import Avatar from 'boring-avatars';
import { useState } from 'react';
import { Drawer } from './Drawer';

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
      <Drawer
        isOpenMenu={showMenu}
        onClose={() => setShowMenu(false)}
        displayName={displayName}
        userEmail={userEmail}
      />
    </div>
  );
};
