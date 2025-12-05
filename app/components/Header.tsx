import { supabase } from '@/lib/supabaseFunctions';
import Link from 'next/link';
import { Logout } from './LogOut';

export const Header = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    console.log('Session data:', session);
    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  });
  return (
    <header className="py-6 px-14 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <Link className="p-1.5 text-2xl font-bold" href="/">
          Home
        </Link>
        <nav>
          <ul className="flex items-center">
            <li>
              <Link
                className="px-4 py-3 bg-blue-300 rounded-md hover:bg-blue-400"
                href="/login"
              >
                ログイン
              </Link>
            </li>
            <li>
              <Link
                className="ml-4 px-4 py-3 bg-blue-300 rounded-md hover:bg-blue-400"
                href="/auth/sign-up"
              >
                サインアップ
              </Link>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
