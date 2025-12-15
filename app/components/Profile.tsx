'use client';
import { useAuth } from '../hooks/useAuth';

export const Profile = () => {
  const { context } = useAuth();

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="w-32 h-32 bg-gray-300 rounded-full text-gray-100 flex items-center justify-center">
        画像
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
