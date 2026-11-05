'use client';
import Link from 'next/link';
import { usePost } from '../hooks/usePost';
import { Preview } from '@/app/components/elements/Preview';
import { useCreatePostForm } from '../hooks/useCreatePostForm';
import { SubmitHandler, useForm } from "react-hook-form";
import { PostFormValues } from '../types';
import { useRouter } from "next/navigation";

export const CreatePostForm = ({
  display_name,
}: {
  display_name: string | null;
}) => {

  const { tab, handleTabChange } = usePost();
  const { submitPost } = useCreatePostForm({ display_name });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({ defaultValues: { title: '', content: '' } });

  const router = useRouter();

  const onSubmit: SubmitHandler<PostFormValues> = async (data: PostFormValues) => {
    try {
      const result = await submitPost(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      // フォームをリセット
      reset();
      // 投稿した記事ページへリダイレクト
      router.push(`/user/post/${result.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '予期せぬエラーが発生しました。');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* タイトル */}
      <div>
        <label className="block mb-1">
          タイトル
          <span className="text-red-500">*</span>
          <span className="ml-2 text-sm text-red-500">
            {errors.title && <span>入力してください</span>}
          </span>
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 w-full"
          {...register('title', { required: true })}
        />
      </div>
      {/* 内容 */}
      <div>
        <label className="block mb-2">
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
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab === 'write' ? ' text-blue-600 border-b-blue-600' : 'hover:text-blue-600 hover:border-b-blue-600 cursor-pointer'}`}
                onClick={() => handleTabChange('write')}
              >
                Write
              </li>
              <li
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab === 'preview' ? ' text-blue-600 border-b-blue-600' : 'hover:text-blue-600 hover:border-b-blue-600 cursor-pointer'}`}
                onClick={() => handleTabChange('preview')}
              >
                Preview
              </li>
            </ul>
          </div>
          <div className={tab === 'preview' ? 'hidden' : 'px-5 pt-5 pb-3.5'}>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full field-sizing-content min-h-50"
              placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
              {...register('content', { required: true })}
            ></textarea>
          </div>
          {tab === 'preview' ? <Preview control={control} /> : null}
        </div>
      </div>
      <div className="text-right">
        <Link href="/user" className="text-gray-500 hover:underline">
          キャンセル
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="ml-4 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          {isSubmitting ? '作成中...' : '作成'}
        </button>
      </div>
    </form>
  );
};
