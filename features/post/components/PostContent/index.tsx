import { ProfileData } from '@/app/types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classes from './PostContent.module.css';
import { getProfileById } from '@/lib/supabaseFunctions';
import { createClient } from '@/lib/supabase/server';
import { japaneseFormattedDate } from '@/lib/common';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { PostData } from '@/features/post/types';

export const PostContent = async ({ post }: { post: PostData }) => {
  // プロフィールに設定された表示名の取得
  const supabase = await createClient();
  const profileInfo: ProfileData = await getProfileById(supabase, post.user_id);

  return (
    <article className="px-4">
      <h1 className="text-5xl leading-normal font-bold">{post?.title}</h1>
      <div className="flex items-start gap-2 mt-12">
        <div className="w-7 h-7 rounded-full">
          <UserAvatar profiles={profileInfo} avatarSize={28} />
        </div>
        <div>
          <p className="text-base">{profileInfo.display_name}</p>
          <p className="text-sm text-gray-500">
            <span>投稿日 {japaneseFormattedDate(post.created_at)}</span>
            {post.updated_at && post.created_at !== post.updated_at ? (
              <span className="ml-3">
                更新日 {japaneseFormattedDate(post.updated_at)}
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <div className="mt-28 prose prose-lg max-w-none">
        <section className={classes.markdown}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            skipHtml={false}
            rehypePlugins={[rehypeRaw]}
          >
            {post?.content}
          </Markdown>
        </section>
      </div>
    </article>
  );
};
