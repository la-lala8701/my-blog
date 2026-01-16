import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { UserAvatar } from './UserAvatar';
import { ProfileData } from '../types';

export const AuthHeader = ({
  profiles,
  userEmail,
}: {
  profiles: ProfileData | null;
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
            <UserAvatar profiles={profiles} avatarSize={44} />
            {/* <Avatar name={profiles?.display_name} size={44} variant="beam" /> */}
          </li>
        </ul>
      </nav>
      {/* メニュー */}
      <Drawer
        isOpenMenu={showMenu}
        onClose={() => setShowMenu(false)}
        displayName={profiles?.display_name}
        userEmail={userEmail}
      />
    </div>
  );
};
