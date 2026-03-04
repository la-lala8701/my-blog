import Link from 'next/link';
import { Logout } from '@/app/components/layouts/Header/LogOut';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { ProfileData } from '@/features/profile/types';

type DrawerProps = {
  isOpenMenu: boolean;
  onClose: () => void;
  profiles: ProfileData | null;
  userEmail: string | undefined;
};

const DrawerMenu = [
  {
    title: '管理',
    items: [{ text: 'マイページ', href: '/user' }],
  },
  {
    title: '設定',
    items: [
      { text: 'プロフィール', href: '/user/settings/profile' },
      { text: 'パスワード', href: '/user/settings/password' },
      { text: 'メールアドレス', href: '/user/settings/email' },
    ],
  },
];

export const Drawer = (props: DrawerProps) => {
  if (!props.isOpenMenu) return null;

  return (
    <div
      className="fixed w-full h-full top-0 left-0 z-10"
      onClick={(e) => e.target === e.currentTarget && props.onClose()}
    >
      {/* ユーザー情報 */}
      <div className="w-64 absolute top-18 right-6 bg-white border border-gray-200 rounded-md shadow-lg p-4 z-10">
        <div className="flex flex-col gap-2 items-center mx-2">
          <div className="w-16 h-16 rounded-full shrink-0">
            <UserAvatar profiles={props.profiles} avatarSize={64} />
          </div>
          <div className="text-lg font-semibold truncate w-full text-center">
            {props.profiles?.display_name}
          </div>
          <div className="text-gray-600 truncate w-full text-center">
            {props.userEmail}
          </div>
        </div>
        {/* メニュー */}
        <dl className="mt-8 space-y-3">
          {DrawerMenu.map((menu) => (
            <div key={menu.title}>
              <dt className="text-gray-500 text-sm p-1">{menu.title}</dt>
              <dd>
                <ul>
                  {menu.items.map((item) => (
                    <li key={item.text}>
                      <Link
                        href={item.href}
                        className="p-4 block hover:bg-gray-100"
                        onClick={() => props.onClose()}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <hr className="my-4 border-gray-300" />
        {/* ログアウト */}
        <Logout />
      </div>
    </div>
  );
};
