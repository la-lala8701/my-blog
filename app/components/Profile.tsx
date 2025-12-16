'use client';
import Avatar from 'boring-avatars';
import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { context } = useAuth();

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="w-32 h-32 rounded-full flex items-center justify-center">
        <Avatar name={context.session?.user.user_metadata.display_name} size={128} variant="beam" />
      </div>
      <div>
        <p className="text-xl font-semibold text-center">{context.session?.user.user_metadata.display_name}</p>
        <p className="mt-2 text-sm max-w-sm">
          ここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入ります
        </p>
      </div>
    </div>
  );
};
