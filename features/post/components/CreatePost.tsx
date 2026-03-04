'use client';
import Link from 'next/link';
import { usePost } from '../hooks/usePost';
import { Preview } from '@/app/components/elements/Preview';
import { useCreateForm } from '../hooks/useCreateForm';

export const CreatePost = ({
  display_name,
}: {
  display_name: string | null;
}) => {

  const { content, tab } = usePost();
  const { form } = useCreateForm({ display_name });

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(form.onSubmit)}>
      {/* タイトル */}
      <div>
        <label className="block mb-1">
          タイトル
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {form.errors.title && <span>入力してください</span>}
          </span>
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 w-full"
          {...form.register('title', { required: true })}
        />
      </div>
      {/* 内容 */}
      <div>
        <label className="block mb-2">
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
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab.tab === 'write' ? ' text-blue-600 border-b-blue-600' : 'hover:text-blue-600 hover:border-b-blue-600 cursor-pointer'}`}
                onClick={() => tab.handleTabChange('write')}
              >
                Write
              </li>
              <li
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab.tab === 'preview' ? ' text-blue-600 border-b-blue-600' : 'hover:text-blue-600 hover:border-b-blue-600 cursor-pointer'}`}
                onClick={() => tab.handleTabChange('preview')}
              >
                Preview
              </li>
            </ul>
          </div>
          {tab.tab === 'write' ? (
            <div className="px-5 pt-5 pb-3.5">
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full field-sizing-content min-h-50"
                placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
                {...form.register('content', { required: true })}
                onChange={content.handleContentChange}
              ></textarea>
            </div>
          ) : tab.tab === 'preview' ? (
            <Preview content={content.content} />
          ) : null}
        </div>
      </div>
      <div className="text-right">
        <Link href="/user" className="text-gray-500 hover:underline">
          キャンセル
        </Link>
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          作成
        </button>
      </div>
    </form>
  );
};
