'use client';
import { PostData, PostFormValues } from '@/features/post/types';
import Link from 'next/link';
import { usePost } from '../hooks/usePost';
import { Preview } from '@/app/components/elements/Preview';
import { useEditForm } from '../hooks/useEditForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const EditPost = ({ post }: { post: PostData }) => {
  const { tab, handleTabChange } = usePost();
  const { submitPost } = useEditForm({ post });
  const { 
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PostFormValues>({ defaultValues: { title: post.title, content: post.content } });

  const router = useRouter();

  const onSubmit: SubmitHandler<PostFormValues> = async (data: PostFormValues) => {
    try {
      const result = await submitPost(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      // フォームをリセット
      reset();
      // 編集後の記事ページへリダイレクト
      router.push(`/user/post/${post.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '予期せぬエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* タイトル */}
      <div className="mb-6">
        <label className="block mb-1" htmlFor="title">
          タイトル
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {errors.title && <span>入力してください</span>}
          </span>
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          {...register('title', { required: true })}
        />
      </div>
      {/* 内容 */}
      <div className="mb-6">
        <label className="block mb-2" htmlFor="content">
          内容
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {errors.content && <span>入力してください</span>}
          </span>
        </label>
        <div className="border border-gray-300">
          <div className="text-sm font-medium text-center border-b border-gray-300">
            <ul className="flex flex-wrap -mb-px">
              <li
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab === 'write' ? " text-blue-600 border-b-blue-600" : "hover:text-blue-600 hover:border-b-blue-600 cursor-pointer"}`}
                onClick={() => handleTabChange('write')}
              >
                Write
              </li>
              <li
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab === 'preview' ? " text-blue-600 border-b-blue-600" : "hover:text-blue-600 hover:border-b-blue-600 cursor-pointer"}`}
                onClick={() => handleTabChange('preview')}
              >
                Preview
              </li>
            </ul>
          </div>
          <div className={tab === 'write' ? 'px-5 pt-5 pb-3.5' : 'hidden'}>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 field-sizing-content min-h-50"
              placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
              {...register('content', { required: true })}
            />
          </div>
          {tab === 'preview' ? <Preview control={control} content={post.content} /> : null}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <Link
          href={`/user/post/${post.id}`}
          className="text-blue-500 hover:underline inline-block"
        >
          ← 戻る
        </Link>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer inline-block"
        >
          {isSubmitting ? '更新中...' : '更新'}
        </button>
      </div>
    </form>
  );
};
