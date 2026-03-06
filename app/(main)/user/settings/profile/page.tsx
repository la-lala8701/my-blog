import Link from 'next/link';
import { getCurrentUser, getProfileById } from '@/lib/supabaseFunctions';
import { ProfileSettings } from '@/features/profile/components/ProfileSettings';
import { createClient } from '@/lib/supabase/server';
import { ProfileData } from '@/features/profile/types';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { User } from '@supabase/supabase-js';
import { AvatarSettings } from '@/features/profile/components/AvatarSettings';
import { AvatarPostAction } from '@/features/profile/components/AvatarPostAction';

export default async function ProfilePage() {
  // 現在のユーザー情報を取得
  const supabase = await createClient();
  const user: User = (await getCurrentUser(supabase)) as User;

  // プロフィールに設定された表示名の取得
  const profiles: ProfileData = await getProfileById(supabase, user.id);

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">プロフィール設定</h1>
      <AvatarPostAction profiles={profiles} user={user}>
        <ProfileSettings
          id={user.id}
          display_name={profiles.display_name}
          description={profiles.description}
        />
        <div className="mt-8">
          <Link href="/user" className="text-blue-500 hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </AvatarPostAction>
    </div>
  );
}
