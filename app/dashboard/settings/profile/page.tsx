import Link from 'next/link';
import Avatar from 'boring-avatars';
import { getProfileById } from '@/lib/supabaseFunctions';
import { ProfileSettings } from '@/app/components/ProfileSettings';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage() {
  // 現在のユーザー情報を取得
  const {
    data: { user },
    error,
  } = await (await createClient()).auth.getUser();
  if (error || !user) {
    console.error('認証セッションが不正です');
    return;
  }

  // プロフィールに設定された表示名の取得
  const { display_name }: { display_name: string } = await getProfileById(
    user.id,
  );

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール設定</h1>
      {/* アイコン画像 */}
      <div className="w-32 h-32 block mx-auto rounded-full">
        <Avatar name={display_name} size={128} variant="beam" />
      </div>
      {/* <input
        type="file"
        name="icon"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => console.log(e.target.files)}
      /> */}
      <ProfileSettings userId={user.id} displayName={display_name} />
      <div className="mt-8">
        <Link
          href="/dashboard/settings"
          className="text-blue-500 hover:underline"
        >
          ← 設定ページに戻る
        </Link>
      </div>
    </div>
  );
}
