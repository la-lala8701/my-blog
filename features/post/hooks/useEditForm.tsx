import { createBrowserSupabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PostData, PostFormValues } from '../types';
import { updatePostById } from '@/lib/supabaseFunctions';

export const useEditForm = (props: { post?: PostData | null }) => {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostFormValues>();

  const onSubmit: SubmitHandler<PostFormValues> = async (
    data: PostFormValues,
  ) => {
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
  };

  return {
    form: { handleSubmit, register, errors, onSubmit },
  };
};
