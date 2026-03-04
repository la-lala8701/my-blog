'use client';
import { PostData } from '@/features/post/types';
import { PostFormValues } from '@/app/types';
import { createBrowserSupabase } from '@/lib/supabase/client';
import {
  addPost,
  getCurrentUser,
  updatePostById,
} from '@/lib/supabaseFunctions';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type usePostProps = {
  display_name?: string | null;
  mode: 'create' | 'edit';
  post?: PostData;
};

export const usePost = (props: usePostProps) => {
  const [content, setContent] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  // 内容の変更をハンドルする関数
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );

  // タブ切り替えのロジック
  const handleTabChange = useCallback(
    (selectedTab: 'write' | 'preview') => {
      setTab(selectedTab);
    },
    [setTab],
  );

  // react-hook-formのセットアップ
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PostFormValues>();

  const onSubmit: SubmitHandler<PostFormValues> = async (
    data: PostFormValues,
  ) => {
    /*========== モードによって処理を分岐 ==========*/
    if (props.mode === 'create') {
      /*----- 新規作成のロジック -----*/
      const id = uuidv4();
      try {
        // 現在のユーザー情報を取得
        const user: User = (await getCurrentUser(supabase)) as User;

        // 表示名が設定されていない時の処理
        if (!props.display_name || props.display_name.length === 0) {
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
    } else {
      /*----- 編集のロジック -----*/
      if (!props.post) {
        console.error('記事データが見つかりません');
        return;
      }
      try {
        // 記事編集のロジック
        await updatePostById(supabase, props.post.id as string, {
          ...props.post,
          ...data,
          updated_at: new Date().toISOString(),
        });

        // 編集後の記事ページへリダイレクト
        router.push(`/user/post/${props.post?.id}`);
      } catch (error) {
        console.error('予期せぬエラー:', error);
      }
    }
  };

  return {
    content: { content, handleContentChange },
    tab: { tab, handleTabChange },
    form: { handleSubmit, register, errors, onSubmit },
  };
};
