import { EditPost } from '@/app/components/EditPost';
import { createClient } from '@/lib/supabase/server';
import { getPostById } from '@/lib/supabaseFunctions';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;
  const post = await getPostById(supabase, id);

  return <EditPost post={post} />;
}
