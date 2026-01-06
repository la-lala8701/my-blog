import Link from 'next/link';
import { Logout } from './LogOut';
import Avatar from 'boring-avatars';

export const AuthHeader = ({ displayName }: { displayName: string | undefined }) => {
  return (
    <nav>
      <ul className="flex items-center">
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
            <Avatar name={displayName} size={44} variant="beam" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
