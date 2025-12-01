import { Post as PostComponent } from '@/app/components/Post';

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <PostComponent pageId={id} />;
}
