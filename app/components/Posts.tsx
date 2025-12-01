import { PostsItem } from './PostsItem';
import { getAllPosts } from '../utils/supabaseFunctions';

export const Posts = async () => {
  const posts = await getAllPosts();
  if (!posts) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <section>
      <h1 className="text-3xl pb-6">記事一覧</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
