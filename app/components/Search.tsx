'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
