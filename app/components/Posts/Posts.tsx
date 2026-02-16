import { PostsItem } from '@/app/components/Posts/PostsItem';
import { PostData } from '@/app/types';

export const Posts = async ({postsData, manage}: {postsData: PostData[], manage?: boolean}) => {

  return (
    <div className="grid grid-cols-1 gap-4">
      {postsData.map((post: PostData) => (
        <PostsItem key={post.id} {...post} manage={manage} />
      ))}
    </div>
  );
};
