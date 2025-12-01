import { Article } from '@/app/components/Article';
import { PostWrapper } from './PostWrapper';
import { getPostById } from '../utils/supabaseFunctions';
import { PostData } from '../types';

export const Post = async ({ pageId }: { pageId: string }) => {
  const getPost: PostData =  await getPostById(pageId);

  return (
    <PostWrapper>
      <Article post={getPost} />
    </PostWrapper>
  );
};
