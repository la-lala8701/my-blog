import Image from 'next/image';
import { ProfileData } from '@/app/types';
import Avatar from 'boring-avatars';

export const UserAvatar = ({
  profiles,
  avatarSize,
}: {
  profiles: ProfileData | null;
  avatarSize: number;
}) => {
  if (!profiles) {
    return;
  }
  return (
    <>
      {profiles.avatar_url && profiles.avatar_url.length > 0 ? (
        <Image
          src={profiles.avatar_url}
          alt={profiles.display_name}
          width={avatarSize}
          height={avatarSize}
          loading="eager"
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <Avatar name={profiles.display_name} size={avatarSize} variant="beam" />
      )}
    </>
  );
};
