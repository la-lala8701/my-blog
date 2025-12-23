import { getProfileById } from '@/lib/supabaseFunctions';
import Avatar from 'boring-avatars';
import { ProfileData } from '../types';

export const Profile = async ({ userId }: { userId: string }) => {
  // プロフィールに設定された表示名の取得
  const profileInfo: ProfileData = await getProfileById(userId);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-3">
        <span className="w-16 h-16 rounded-full">
          <Avatar name={profileInfo.display_name} size={64} variant="beam" />
        </span>
        <p className="text-xl font-semibold text-center">
          {profileInfo.display_name}
        </p>
      </div>
      <div>
        <p className="mt-2 text-sm">{profileInfo.description}</p>
      </div>
    </div>
  );
};
