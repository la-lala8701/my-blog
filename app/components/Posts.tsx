import { getAllPosts } from '@/lib/supabaseFunctions';
import { PostsItem } from './PostsItem';
import { notFound } from 'next/navigation';
import { PostData } from '../types';

export const Posts = async () => {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <h1 className="text-3xl pb-6">記事一覧</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: PostData) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
