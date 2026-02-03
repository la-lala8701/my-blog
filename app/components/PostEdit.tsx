'use client';

import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { EditButtons } from './EditButtons';
import { PostData } from '../types';
import { updatePostPublishStatus } from '@/lib/supabaseFunctions';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase/client';

export const PostEdit = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: PostData;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [release, setRelease] = useState<boolean>(post.is_published);
  const supabase = createBrowserSupabase();

  const handleClick = async () => {
    // 公開・非公開の切り替え
    await updatePostPublishStatus(supabase, post.id, !release);
    setRelease(!release);
  };

  return (
    <>
      <div className='flex justify-between mb-12'>
        <Link href="/user" className="block text-blue-500 hover:underline">
          ← マイページに戻る
        </Link>
        {release ? (
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-400 cursor-pointer block"
          >
            非公開
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="ml-auto px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-500 cursor-pointer block mb-12"
          >
            公開
          </button>
        )}
      </div>
      {children}
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      <EditButtons setShowModal={setShowModal} />
    </>
  );
};
