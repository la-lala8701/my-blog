'use client';
import { User } from '@supabase/supabase-js';
import { ProfileData } from '@/features/profile/types';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { useAvatarForm } from '../hooks/useAvatarForm';
import { RealtimeChangeAvatar } from './RealtimeChangeAvatar';

export const AvatarSettings = ({
  user,
  profiles,
}: {
  user: User;
  profiles: ProfileData;
}) => {
  const { handleUploadStrage, handleSubmit } = useAvatarForm({ user });

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="text-center text-2xl">プロフィール画像の変更</h1>
      {/* ここにプレビュー画像を表示する */}
      <div className="flex justify-center my-4 w-32 h-32 rounded-full mx-auto">
        <RealtimeChangeAvatar userId={user.id} profiles={profiles}>
          {(AvatarProfile) => <UserAvatar profiles={AvatarProfile} avatarSize={128} />}
        </RealtimeChangeAvatar>
      </div>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label
          className="block mb-2.5 text-sm font-medium"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="file:bg-zinc-200 file:py-2 file:px-4 file:me-4 file:cursor-pointer cursor-pointer border border-zinc-500 text-sm rounded-xl focus:ring-sky-500 focus:ring-2 focus:border-0 block w-full shadow-xs placeholder:text-body"
          type="file"
          name="avatar"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => handleUploadStrage(e)}
          required
        />
        <p className="mt-1 text-sm text-zinc-500 mb-2">
          ※ PNG or JPG (MAX. 5MB, 推奨サイズ 720x720px)
        </p>
        <button
          className="ml-auto block px-4 py-2 rounded-md border cursor-pointer border-zinc-800 bg-zinc-800 text-white hover:bg-white hover:text-zinc-800"
          type="submit"
        >
          保存
        </button>
      </form>
    </div>
  );
};
