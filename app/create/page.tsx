import Link from 'next/link';
import { CreatePost } from '../components/CreatePost';
import { createClient } from '@/lib/supabase/server';
import { getProfileById } from '@/lib/supabaseFunctions';

export default async function CreatePage() {
  const supabase = await createClient();
  // 現在のユーザー情報を取得
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    console.error('認証セッションが不正です');
    return;
  }

  // プロフィールに設定された表示名の取得
  const { display_name }: { display_name: string } = await getProfileById(
    supabase, user.id,
  );

  return (
    <div className="mx-auto max-w-5xl py-12">
      {!display_name ? (
        <dl className="border text-red-600 rounded-md px-4 py-3 mb-12">
          <dt className="font-bold flex place-items-end gap-2"><span className='inline-block'>【注意】</span></dt>
          <dd className='mt-2'>
            記事を作成するには、プロフィール設定から<Link className='text-blue-600 hover:underline' href='/dashboard/settings/profile'>表示名を設定</Link>する必要があります。
          </dd>
        </dl>
      ) : null}
      <h1 className="text-3xl font-bold mb-8 text-center">記事作成</h1>
      <CreatePost display_name={display_name} />
    </div>
  );
}
