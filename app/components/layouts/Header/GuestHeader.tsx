import Link from "next/link";

export const GuestHeader = () => {
  return (
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
            className="ml-4 px-4 py-3 bg-yellow-300 rounded-md hover:bg-yellow-400"
            href="/sign-up"
          >
            サインアップ
          </Link>
        </li>
      </ul>
    </nav>
  );
};
