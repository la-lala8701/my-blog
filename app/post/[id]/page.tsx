import { Article } from '@/app/components/Article';
import { PostEdit } from '@/app/components/PostEdit';
import { Profile } from '@/app/components/Profile';
import { PostData } from '@/app/types';
import { getPostById } from '@/lib/supabaseFunctions';

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pageId: string = (await params).id;
  const getPost: PostData = await getPostById(pageId);

  return (
    <div className="flex gap-10 mx-auto max-w-5xl mt-12 mb-16">
      <div className="max-w-3xl flex-1">
        <Article post={getPost} />
      </div>
      <div className="w-56 sticky top-12 h-fit">
        <Profile userId={getPost.user_id} />
      </div>
    </div>
  );
}
