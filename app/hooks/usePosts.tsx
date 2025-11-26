import { useEffect, useState } from 'react';
// import { storageData } from '../utils/storageData';
import { PostData } from '../types';
import { getAllPosts } from '../utils/supabaseFunctions';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
      if (posts) {
        setPosts(posts);
        console.log(posts);
      }
    };
    getPosts();
  }, []);

  return { posts };
};
