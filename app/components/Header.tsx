import Link from "next/link";

export const Header = () => {
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
