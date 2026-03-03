'use client';
import { PostData, PostFormValues } from '@/app/types';
import { updatePostById } from '@/lib/supabaseFunctions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { usePost } from '../hooks/usePost';
import { Preview } from '@/app/components/elements/Preview';

export const EditPost = ({ post }: { post: PostData }) => {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostFormValues>();
  const { content, handleContentChange, tab, handleTabChange } = usePost();

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      // 記事編集のロジック
      await updatePostById(supabase, post.id, { ...post, ...data, updated_at: new Date().toISOString() });

      // 編集後の記事ページへリダイレクト
      router.push(`/user/post/${post.id}`);
    } catch (error) {
      console.error('予期せぬエラー:', error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">記事編集ページ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={post.title}
            className="w-full border border-gray-300 rounded-md p-2"
            {...register('title', { required: true })}
          />
        </div>
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
            {tab === 'write' ? (
              <div className="px-5 pt-5 pb-3.5">
                <textarea
                  defaultValue={post.content}
                  className="w-full border border-gray-300 rounded-md p-2 field-sizing-content min-h-50"
                  placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
                  {...register('content', { required: true })}
                  onChange={handleContentChange}
                />
              </div>
            ) : tab === 'preview' ? (
              <Preview content={content} />
            ) : null}
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
            更新
          </button>
        </div>
      </form>
    </div>
  );
};
