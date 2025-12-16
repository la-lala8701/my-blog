import { Article } from '@/app/components/Article';
import { PostWrapper } from './PostWrapper';
import { PostData } from '../types';
import { getPostById } from '@/lib/supabaseFunctions';
import { Profile } from './Profile';

export const Post = async ({ pageId }: { pageId: string }) => {
  const getPost: PostData = await getPostById(pageId);

  return (
    <PostWrapper>
      <Article post={getPost} />
      <Profile author={getPost.author} />
    </PostWrapper>
  );
};
