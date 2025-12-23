import Link from 'next/link';
import { HeaderNavi } from './HeaderNavi';

export const Header = () => {

  return (
    <header className="py-6 px-14 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <Link className="p-1.5 text-2xl font-bold" href="/">
          Home
        </Link>
        <HeaderNavi />
      </div>
    </header>
  );
};
