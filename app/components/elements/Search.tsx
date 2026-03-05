'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type SearchInputType = {
  term: string;
};

export const Search = () => {
  const { register, handleSubmit } = useForm<SearchInputType>();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<SearchInputType> = (data) => {
    const params = new URLSearchParams(searchParams);
    if (data.term) {
      params.set('query', data.term);
    } else {
      params.delete('query');
    }
    push(`/?${params.toString()}`);
  };
  return (
    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register('term')}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </form>
  );
};
