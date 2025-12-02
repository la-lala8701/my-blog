import { EditPost } from '@/app/components/EditPost';
import { getPostById } from '@/app/utils/supabaseFunctions';

export default async function EditPage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params;
  const post = await getPostById(id);


  return <EditPost post={post} />;
}
