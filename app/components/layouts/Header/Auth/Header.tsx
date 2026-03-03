import Link from 'next/link';

export const Header = () => {

  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link className="p-1.5 text-2xl font-bold" href="/">
          MyBlog
        </Link>
      </div>
    </header>
  );
};
