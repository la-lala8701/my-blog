import { Article } from '@/app/components/Article';
import { PostWrapper } from './PostWrapper';
import { PostData } from '../types';
import { getPostById } from '@/lib/supabaseFunctions';
import { Profile } from './Profile';

export const Post = async ({ pageId }: { pageId: string }) => {
  const getPost: PostData = await getPostById(pageId);

  return (
    <div className="flex gap-10 mx-auto max-w-5xl mt-12">
      <div className='max-w-3xl flex-1'>
        <PostWrapper>
          <Article post={getPost} />
        </PostWrapper>
      </div>
      <div className='w-56 sticky top-12 h-fit'>
        <Profile userId={getPost.user_id} />
      </div>
    </div>
  );
};
