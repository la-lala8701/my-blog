import { PostData } from '@/app/types';
import { createClient } from './supabase/client';

export const supabase = createClient();

// 記事データ
export const getAllPosts = async () => {
  const posts = await supabase.from('posts').select('*');
  return posts.data;
};

export const getPostById = async (id: string) => {
  const post = await supabase.from('posts').select('*').eq('id', id).single();
  return post.data;
};

export const addPost = async (post: PostData) => {
  const { error: postError } = await supabase.from('posts').insert(post);
  if (postError) {
    console.error('投稿エラー:', postError);
    alert('記事の投稿に失敗しました。');
    return;
  }
  alert('記事が投稿されました！');
};

export const deletePostById = async (id: string) => {
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
  id: string,
  updatedPost: Partial<PostData>,
) => {
  await supabase.from('posts').update(updatedPost).eq('id', id);
};

// プロフィールデータ
export const getProfileById = async (id: string) => {
  const profile = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  return profile.data;
};

export const updateProfileById = async (id: string, name: string, description: string) => {
  const { error } = await supabase.from('profiles').update({'display_name': name, 'description': description}).eq('id', id);
  if (error) {
    console.error('エラー:', error);
    alert('データの更新に失敗しました。');
    return;
  }
  alert('データを更新しました');
};

export const uploadsImage = async (file) => {
  const { error } = await supabase.storage
    .from('bucket_name')
    .upload('file_path', file);
  if (error) {
    console.error('削除エラー:', error);
    alert('画像のアップロードに失敗しました。');
    return;
  }
};
