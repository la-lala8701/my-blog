import Link from 'next/link';
import { HeaderNavi } from '@/app/components/layouts/Header/HeaderNavi';
import { Search } from '@/app/components/elements/Search/Search';

export const Header = () => {
  return (
    <header className="py-6 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link className="p-1.5 text-2xl font-bold" href="/">
          MyBlog
        </Link>
        <Search />
        <HeaderNavi />
      </div>
    </header>
  );
};
