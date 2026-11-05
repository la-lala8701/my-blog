import { createBrowserSupabase } from "@/lib/supabase/client";
import { PostData, PostFormValues, SubmitResult } from "../types";
import { addPost, getCurrentUser } from "@/lib/supabaseFunctions";
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';

export const useCreatePostForm = (props: { display_name?: string | null }) => {
  const supabase = createBrowserSupabase();

  const submitPost = async (data: PostFormValues): Promise<SubmitResult> => {
      // 表示名が設定されていない時の処理
      if (!props.display_name || props.display_name.length === 0) {
        return { success: false, error: 'プロフィール設定から、表示名を設定してください。' };
      }

      // 現在のユーザー情報を取得
      const user: User = (await getCurrentUser(supabase)) as User;
      // ユーザー情報が取得できなかった場合
      if (!user) {
        return { success: false, error: 'ユーザー情報が取得できませんでした。' };
      }

      // 新規記事データ
      const newPost: PostData = {
        title: data.title,
        content: data.content,
        user_id: user.id,

        // ※以下は今後データベース側で自動生成するようにする
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: false,
      };

      // 記事をpostsテーブルに挿入する
      const result = await addPost(supabase, newPost);
      if (!result.success) {
        return { success: false, error: '記事の投稿に失敗しました。' };
      }
  
    return { success: true, id: newPost.id };
  }

  return {
    submitPost,
  };
};
