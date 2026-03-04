import Link from 'next/link';
import { getCurrentUser, getProfileById } from '@/lib/supabaseFunctions';
import { ProfileSettings } from '@/features/profile/components/ProfileSettings';
import { createClient } from '@/lib/supabase/server';
import { ProfileData } from '@/app/types';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { User } from '@supabase/supabase-js';

export default async function ProfilePage() {
  // 現在のユーザー情報を取得
  const supabase = await createClient();
  const user: User = (await getCurrentUser(supabase)) as User;

  // プロフィールに設定された表示名の取得
  const profileInfo: ProfileData = await getProfileById(supabase, user.id);

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール設定</h1>
      {/* アイコン画像 */}
      <div className="w-32 h-32 block mx-auto rounded-full relative overflow-hidden text-transparent hover:text-white">
        <Link
          href="/user/settings/profile/avatar"
          className="block w-32 h-32 hover:brightness-50 transition"
        >
          <UserAvatar profiles={profileInfo} avatarSize={128} />
        </Link>
        <span className="inline-block py-0.5 px-1.5 rounded-md border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          編集
        </span>
      </div>
      <ProfileSettings
        id={user.id}
        display_name={profileInfo.display_name}
        description={profileInfo.description}
      />
      <div className="mt-8">
        <Link href="/user" className="text-blue-500 hover:underline">
          ← マイページに戻る
        </Link>
      </div>
    </div>
  );
}
