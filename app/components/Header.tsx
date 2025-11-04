import Link from "next/link";

export const Header = () => {
  return (
    <header className="p-6 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <h1 className="p-1.5 text-2xl font-bold">
          <Link href="/">Home</Link>
        </h1>
        <nav>
          <ul>
            <li className="p-1.5">
              <Link href="/about">記事作成</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
