'use client';
import { PostData } from '@/features/post/types';
import Link from 'next/link';
import { usePost } from '../hooks/usePost';
import { Preview } from '@/app/components/elements/Preview';
import { useEditForm } from '../hooks/useEditForm';

export const EditPost = ({ post }: { post: PostData }) => {
  const { content, tab } = usePost();
  const { form } = useEditForm({ post });

  return (
    <div className="mx-auto max-w-5xl py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">記事編集ページ</h1>
      <form onSubmit={form.handleSubmit(form.onSubmit)}>
        <div className="mb-6">
          <label className="block mb-1" htmlFor="title">
            タイトル
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {form.errors.title && <span>入力してください</span>}
            </span>
          </label>
          <input
            type="text"
            defaultValue={post.title}
            className="w-full border border-gray-300 rounded-md p-2"
            {...form.register('title', { required: true })}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="content">
            内容
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {form.errors.content && <span>入力してください</span>}
            </span>
          </label>
          <div className="border border-gray-300">
            <div className="text-sm font-medium text-center border-b border-gray-300">
              <ul className="flex flex-wrap -mb-px">
                <li
                  className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab.tab === 'write' ? " text-blue-600 border-b-blue-600" : "hover:text-blue-600 hover:border-b-blue-600 cursor-pointer"}`}
                  onClick={() => tab.handleTabChange('write')}
                >
                  Write
                </li>
                <li
                  className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab.tab === 'preview' ? " text-blue-600 border-b-blue-600" : "hover:text-blue-600 hover:border-b-blue-600 cursor-pointer"}`}
                  onClick={() => tab.handleTabChange('preview')}
                >
                  Preview
                </li>
              </ul>
            </div>
            {tab.tab === 'write' ? (
              <div className="px-5 pt-5 pb-3.5">
                <textarea
                  defaultValue={post.content}
                  className="w-full border border-gray-300 rounded-md p-2 field-sizing-content min-h-50"
                  placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
                  {...form.register('content', { required: true })}
                  onChange={content.handleContentChange}
                />
              </div>
            ) : tab.tab === 'preview' ? (
              <Preview content={content.content} />
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
