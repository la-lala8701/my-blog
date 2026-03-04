import Link from 'next/link';
import { ProfileData } from '@/app/types';
import { createClient } from '@/lib/supabase/server';
import { getProfileById } from '@/lib/supabaseFunctions';
import { japaneseFormattedDate } from '@/lib/common';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { PostsItemProps } from '../types';

export const PostsItem = async (props: PostsItemProps) => {
  const supabase = await createClient();
  // プロフィールに設定された表示名の取得
  const profileInfo: ProfileData = await getProfileById(
    supabase,
    props.user_id,
  );

  return (
    <article>
      <Link
        href={props.manage ? `/user/post/${props.id}` : `/post/${props.id}`}
        className={`block border-2 rounded-lg p-4 ${props.manage && props.is_published ? 'border-indigo-400 bg-indigo-100 hover:bg-indigo-200' : 'border-gray-300 hover:bg-gray-100'}`}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">{props.title}</h3>
          {props.manage && props.is_published ? (
            <span className="inline-block px-2 py-1 text-xs bg-indigo-500 text-white rounded-full">
              公開中
            </span>
          ) : props.manage && !props.is_published ? (
            <span className="inline-block px-2 py-1 text-xs bg-gray-500 text-white rounded-full">
              非公開
            </span>
          ) : null}
        </div>
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full">
            <UserAvatar profiles={profileInfo} avatarSize={28} />
          </div>
          <div>
            <p className="text-base">{profileInfo.display_name}</p>
            <p className="text-sm text-gray-500">
              {japaneseFormattedDate(props.created_at)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
