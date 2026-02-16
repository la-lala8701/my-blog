import { getProfileById } from '@/lib/supabaseFunctions';
import { ProfileData } from '@/app/types';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { UserAvatar } from '@/app/components/Profile/UserAvatar';

export const Profile = async ({ userId }: { userId: string }) => {
  const supabase = await createClient();
  // プロフィールに設定された表示名の取得
  const profileInfo: ProfileData = await getProfileById(supabase, userId);

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="w-20 h-20 rounded-full shrink-0">
          <UserAvatar profiles={profileInfo} avatarSize={80} />
        </span>
        <span className="text-lg font-semibold shrink wrap-anywhere">
          {profileInfo.display_name.length > 0 ? (
            profileInfo.display_name
          ) : (
            <span>
              <Link
                className="text-blue-500 underline"
                href="/user/settings/profile"
              >
                設定
              </Link>
              してください
            </span>
          )}
        </span>
      </div>
      <div className="mt-5">
        <p className="mt-2 text-sm">{profileInfo.description}</p>
      </div>
    </div>
  );
};
