import Link from 'next/link';
import { HeaderNavi } from '@/app/components/layouts/Header/HeaderNavi';
import { Search } from '@/app/components/elements/Search';

export const Header = () => {
  return (
    <header className="py-6 border-b border-gray-300">
      {/* SP時検索窓だけ下げたい */}
      <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-2 items-center gap-4 md:grid-cols-1 md:flex md:justify-between">
        <Link className="p-1.5 text-2xl font-bold col-start-1 inline-block" href="/">
          MyBlog
        </Link>
        <div className="order-3 col-span-2 md:order-2 md:w-2/5">
          <Search />
        </div>
        <div className="order-2 col-start-2 flex justify-end -ml-10 md:order-3 md:ml-0">
          <HeaderNavi />
        </div>
      </div>
    </header>
  );
};
