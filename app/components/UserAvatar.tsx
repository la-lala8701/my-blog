import Image from 'next/image';
import { ProfileData } from '../types';
import Avatar from 'boring-avatars';

export const UserAvatar = ({
  profiles,
  avatarSize,
}: {
  profiles: ProfileData;
  avatarSize: number;
}) => {
  return (
    <>
      {profiles.avatar_url && profiles.avatar_url.length > 0 ? (
        <Image
          src={profiles.avatar_url}
          alt={profiles.display_name}
          width={avatarSize}
          height={avatarSize}
          loading="eager"
          className="rounded-full object-cover"
        />
      ) : (
        <Avatar name={profiles.display_name} size={avatarSize} variant="beam" />
      )}
    </>
  );
};
