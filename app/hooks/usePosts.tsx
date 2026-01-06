// 今のところ使われていない
import { useEffect, useState } from 'react';
import { PostData } from '../types';
import { getAllPosts } from '@/lib/supabaseFunctions';
import { createClient } from '@/lib/supabase/client';

export const usePosts = () => {
  const supabase = createClient();
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
