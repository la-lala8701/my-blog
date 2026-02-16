'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type SearchInputType = {
  term: string;
};

export const ManagePostsSearch = () => {
  const { register, handleSubmit } = useForm<SearchInputType>();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const onSubmit: SubmitHandler<SearchInputType> = (data) => {
    const params = new URLSearchParams(searchParams);
    if (data.term) {
      params.set('query', data.term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="w-full max-w-md ml-auto flex mb-12 gap-2">
      <form action="" method="post" onSubmit={handleSubmit(onSubmit)} className="grow">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('term')}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </form>
      <details className="relative">
        <summary
          className="inline-block cursor-pointer bg-gray-200 px-3 py-2 rounded-md list-none"
          role="button"
        >
          Sort
        </summary>
        <div className="mt-2 p-4 border rounded-lg bg-gray-50 absolute right-0 w-48 shadow-lg">
          <label className="block mb-2">
            <input type="radio" name="filter" className="mr-2" />
            公開中のみ表示
          </label>
          <label className="block">
            <input type="radio" name="filter" className="mr-2" />
            非公開のみ表示
          </label>
        </div>
      </details>
    </div>
  );
};
