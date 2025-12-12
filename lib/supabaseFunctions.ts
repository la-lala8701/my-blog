import { PostData } from '@/app/types';
import { createClient } from './supabase/client';

export const supabase = createClient();

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
    console.error('投稿エラー:', postError)
    alert('記事の投稿に失敗しました。')
    return
  }
  alert('記事が投稿されました！');
};

export const deletePostById = async (id: string) => {
  await supabase.from('posts').delete().eq('id', id);
};

export const updatePostById = async (
  id: string,
  updatedPost: Partial<PostData>,
) => {
  await supabase.from('posts').update(updatedPost).eq('id', id);
};
