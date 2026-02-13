import { PostData } from '@/app/types';
import { SupabaseClient } from '@supabase/supabase-js';

// 記事のCRUD操作
export const getPublicPosts = async (supabase: SupabaseClient) => {
  const posts = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  return posts.data;
};

export const getPostById = async (supabase: SupabaseClient, id: string) => {
  const post = await supabase.from('posts').select('*').eq('id', id).single();
  return post.data;
};

export const getUserPosts = async (supabase: SupabaseClient, id: string) => {
  const posts = await supabase.from('posts').select('*').eq('user_id', id);
  return posts.data;
};

export const addPost = async (supabase: SupabaseClient, post: PostData) => {
  const { error: postError } = await supabase.from('posts').insert(post);
  if (postError) {
    console.error('投稿エラー:', postError);
    alert('記事の投稿に失敗しました。');
    return;
  }
  alert('記事が投稿されました！');
};

export const deletePostById = async (supabase: SupabaseClient, id: string) => {
  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (deleteError) {
    console.error('削除エラー:', deleteError);
    alert('記事の削除に失敗しました。');
    return;
  }
};

export const updatePostById = async (
  supabase: SupabaseClient,
  id: string,
  updatedPost: Partial<PostData>,
) => {
  const { error } = await supabase
    .from('posts')
    .update(updatedPost)
    .eq('id', id);
  if (error) {
    console.error('更新エラー:', error);
    alert('記事の更新に失敗しました。');
    return;
  }
  alert('記事が更新されました！');
};

// 公開状態の更新
export const updatePostPublishStatus = async (
  supabase: SupabaseClient,
  id: string,
  is_published: boolean,
) => {
  await supabase.from('posts').update({ is_published }).eq('id', id);
};

// プロフィールデータ
export const getProfileById = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.warn(error.message);
    return null;
  }

  return data;
};

export const updateProfileById = async (
  supabase: SupabaseClient,
  id: string,
  name: string,
  description: string,
) => {
  const { error } = await supabase
    .from('profiles')
    .update({ display_name: name, description: description })
    .eq('id', id);
  if (error) {
    console.error('エラー:', error);
    alert('データの更新に失敗しました。');
    return;
  }
  alert('データを更新しました');
};

// 現在のユーザー情報を取得する関数
export const getCurrentUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('認証セッションが不正です');
    return null;
  }

  return user;
};

// 公開記事検索
export const searchPublicPosts = async (supabase: SupabaseClient, query: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('is_published', true);
  if (error) throw error;
  return data;
};

// 管理記事検索
export const searchUserPosts = async (supabase: SupabaseClient, query: string, userId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};