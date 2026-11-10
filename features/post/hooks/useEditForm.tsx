import { createBrowserSupabase } from '@/lib/supabase/client';
import { PostData, PostFormValues, SubmitResult } from '../types';
import { updatePostById } from '@/lib/supabaseFunctions';

export const useEditForm = (props: { post: PostData }) => {
  const supabase = createBrowserSupabase();

  const submitPost = async (data: PostFormValues): Promise<SubmitResult> => {
    // 記事データの更新
    const result = await updatePostById(supabase, props.post.id as string, {
      ...props.post,
      ...data,
      updated_at: new Date().toISOString(),
    });

    if (!result.success) {
      return { success: false, error: '記事の更新に失敗しました。' };
    }

    return { success: true };
  }

  return {
    submitPost,
  };
};
