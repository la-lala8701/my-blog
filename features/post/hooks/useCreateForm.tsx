import { createBrowserSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostData, PostFormValues } from "../types";
import { addPost, getCurrentUser } from "@/lib/supabaseFunctions";
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';

export const useCreateForm = (props: { display_name?: string | null }) => {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const id = uuidv4();
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
    /*----- 新規作成のロジック -----*/
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
  };

  return {
    form: { handleSubmit, register, errors, onSubmit },
  };
};
