import Link from "next/link";

export const GuestHeader = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <Link
            className="px-3 py-2 text-sm inline-block bg-blue-300 rounded-md hover:bg-blue-400 text-center"
            href="/login"
          >
            ログイン
          </Link>
        </li>
        <li>
          <Link
            className="ml-3 px-3 py-2 text-sm inline-block bg-yellow-300 rounded-md hover:bg-yellow-400 text-center"
            href="/sign-up"
          >
            新規登録
          </Link>
        </li>
      </ul>
    </nav>
  );
};
