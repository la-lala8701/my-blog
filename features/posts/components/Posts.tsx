import { PostsItem } from '@/features/posts/components/PostsItem';
import { PostData } from '@/features/post/types';

export const Posts = async ({
  postsData,
  manage,
}: {
  postsData: PostData[];
  manage?: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {postsData.map((post: PostData) => (
        <PostsItem key={post.id} {...post} manage={manage} />
      ))}
    </div>
  );
};
