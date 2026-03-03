import { PostContent } from '@/features/post/components/PostContent';
import { PostActions } from '@/features/post/components/PostActions';
import { PostData } from '@/app/types';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const pageId: string = (await params).id;
  const getPost: PostData = await getPostById(supabase, pageId);

  return (
    <div className="max-w-3xl mt-12 mb-16 mx-auto">
      <PostActions post={getPost}>
        <PostContent post={getPost} />
      </PostActions>
    </div>
  );
}
