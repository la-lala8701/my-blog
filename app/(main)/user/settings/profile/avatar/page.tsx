import { AvatarSettings } from '@/features/profile/components/AvatarSettings';
import { ProfileData } from '@/features/profile/types';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser, getProfileById } from '@/lib/supabaseFunctions';
import { User } from '@supabase/supabase-js';

export default async function AvatarPage() {
  // 現在のユーザー情報を取得
  const supabase = await createClient();
  const user: User = (await getCurrentUser(supabase)) as User;

  // プロフィールデータの取得
  const profileInfo: ProfileData = await getProfileById(supabase, user.id);

  return <AvatarSettings user={user} profiles={profileInfo} />;
}
