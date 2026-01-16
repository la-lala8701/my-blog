import { AvatarSettings } from "@/app/components/AvatarSettings";
import { ProfileData } from "@/app/types";
import { createClient } from "@/lib/supabase/server";
import { getProfileById } from "@/lib/supabaseFunctions";


export default async function AvatarPage() {
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

  // プロフィールデータの取得
  const profileInfo: ProfileData = await getProfileById(supabase, user.id);

  return (
    <AvatarSettings user={user} profiles={profileInfo} />
  );
}
