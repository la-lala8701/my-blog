import { PostData } from '../types';
import { supabase } from './spabase';

export const getAllPosts = async () => {
  const posts = await supabase.from('posts').select('*');
  return posts.data;
};

export const addPost = async (post:PostData) => {
  await supabase.from('posts').insert(post);
};
