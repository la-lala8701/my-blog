import { PostContent } from '@/features/post/components/PostContent';
import { Profile } from '@/features/profile/components/Profile';
import { PostData } from '@/features/post/types';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

export const revalidate = 3600;

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const pageId: string = (await params).id;
  const getPost: PostData = await getPostById(supabase, pageId);

  return (
    <div className="flex gap-10 mx-auto max-w-5xl mt-12 mb-16 px-12 flex-col lg:flex-row">
      <div className="w-full lg:max-w-3xl lg:flex-1">
        <PostContent post={getPost} />
      </div>
      <div className="w-full md:w-56 md:sticky top-12 md:h-fit">
        <Profile userId={getPost.user_id} />
      </div>
    </div>
  );
}
