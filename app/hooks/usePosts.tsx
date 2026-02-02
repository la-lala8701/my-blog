// 今のところ使われていない
import { useEffect, useState } from 'react';
import { PostData } from '../types';
import { getAllPosts } from '@/lib/supabaseFunctions';
import { createBrowserSupabase } from '@/lib/supabase/browser';

export const usePosts = () => {
  const supabase = createBrowserSupabase();
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts(supabase);
      if (posts) {
        setPosts(posts);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
