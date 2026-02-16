'use client';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { PostData, PostFormValues } from '@/app/types';
import { addPost, getCurrentUser } from '@/lib/supabaseFunctions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import classes from '@/app/components/Post/PostContent/PostContent.module.css';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export const CreatePost = ({
  display_name,
}: {
  display_name: string | null;
}) => {
  const supabase = createBrowserSupabase();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>();
  const router = useRouter();
  const id = uuidv4();
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [content, setContent] = useState('');
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      // 現在のユーザー情報を取得
      const user: User = await getCurrentUser(supabase) as User;

      // 表示名が設定されていない時の処理
      if (!display_name || display_name.length === 0) {
        alert('プロフィール設定から、表示名を設定してください。');
        return;
      }

      // 新規記事データ
      const newPost: PostData = {
        id,
        user_id: user.id,
        title: data.title,
        content: data.content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: false,
      };

      // 記事をpostsテーブルに挿入する
      await addPost(supabase, newPost);
      // フォームをリセット
      reset();
      // 投稿した記事ページへリダイレクト
      router.push(`/user/post/${id}`);
    } catch (error) {
      console.error('予期せぬエラー', error);
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
                onClick={() => setTab('write')}
              >
                Write
              </li>
              <li
                className={`me-2 inline-block py-3 px-8 border-b border-transparent rounded-t-md ${tab === 'preview' ? ' text-blue-600 border-b-blue-600' : 'hover:text-blue-600 hover:border-b-blue-600 cursor-pointer'}`}
                onClick={() => setTab('preview')}
              >
                Preview
              </li>
            </ul>
          </div>
          {tab === 'write' ? (
            <div className="px-5 pt-5 pb-3.5">
              <textarea
                className="border border-gray-300 rounded-md p-2 w-full field-sizing-content min-h-50"
                placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
                {...register('content', { required: true })}
                onChange={handleContentChange}
              ></textarea>
            </div>
          ) : tab === 'preview' ? (
            <div className="px-10 pb-10">
              <section className={classes.markdown}>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  skipHtml={false}
                  rehypePlugins={[rehypeRaw]}
                >
                  {content}
                </Markdown>
              </section>
            </div>
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
