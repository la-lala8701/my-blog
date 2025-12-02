
import { PostData } from '@/app/types';
// import { supabase } from '@/app/utils/spabase';
import { createClient } from './supabase/client';

const supabase = createClient();

export const getAllPosts = async () => {
  const posts = await supabase.from('posts').select('*');
  return posts.data;
};

export const getPostById = async (id: string) => {
  const post = await supabase.from('posts').select('*').eq('id', id).single();
  return post.data;
};

export const addPost = async (post: PostData) => {
  await supabase.from('posts').insert(post);
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

export const signUpUser = async (email: string, password: string) => {
  await supabase.auth.signUp({
    email,
    password,
  });
};

export const signInUser = async (email: string, password: string) => {
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
}
