import { useEffect, useState } from 'react';
import { PostData } from '../types';
import { getAllPosts } from '../utils/supabaseFunctions';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
      if (posts) {
        setPosts(posts);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
