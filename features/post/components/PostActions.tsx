'use client';
import { useState } from 'react';
import { EditButtons } from '@/features/post/components/EditButtons';
import { ModalContent, PostData } from '@/app/types';
import {
  deletePostById,
  updatePostPublishStatus,
} from '@/lib/supabaseFunctions';
import Link from 'next/link';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { ConfirmationModal } from '@/app/components/ConfirmationModal';

export const PostActions = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: PostData;
}) => {
  // 表示するコンテンツを管理（nullなら非表示）
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  // 公開・非公開の状態管理
  const [release, setRelease] = useState<boolean>(post.is_published);

  const supabase = createBrowserSupabase();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const handleTogglePublish = async () => {
    // 公開・非公開の切り替え
    await updatePostPublishStatus(supabase, post.id, !release);
    setRelease(!release);
    setModalContent(null);
  };

  const handlePostDelete = async () => {
    // 記事削除処理
    await deletePostById(supabase, params.id);
    router.push('/user');
  };

  // モーダルを開く関数
  const openModal = (content: ModalContent) => {
    setModalContent(content);
  };

  // ボタンごとのデータ定義
  const buttonData = {
    publish: {
      title: '公開確認！',
      message: 'この記事を公開しますか？',
      bgColor: 'bg-indigo-800',
      hoverColor: 'hover:bg-indigo-500',
      handleAction: handleTogglePublish,
    },
    unpublish: {
      title: '非公開確認！',
      message: 'この記事を非公開にしますか？',
      bgColor: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-400',
      handleAction: handleTogglePublish,
    },
    postDelete: {
      title: '削除確認！',
      message: '削除すると元に戻すことはできません。よろしいですか？',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-300',
      handleAction: handlePostDelete,
    },
  };

  return (
    <>
      <div className="flex justify-between mb-12">
        <Link href="/user" className="block text-blue-500 hover:underline">
          ← マイページに戻る
        </Link>
        {release ? (
          <button
            onClick={() => openModal(buttonData.unpublish)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-400 cursor-pointer block"
          >
            非公開
          </button>
        ) : (
          <button
            onClick={() => openModal(buttonData.publish)}
            className="ml-auto px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-500 cursor-pointer block mb-12"
          >
            公開
          </button>
        )}
      </div>
      {children}
      <EditButtons openDeleteModal={() => openModal(buttonData.postDelete)} />
      {/* モーダル */}
      {modalContent ? (
        <ConfirmationModal
          modalContent={modalContent}
          closeModal={() => setModalContent(null)}
        />
      ) : null}
    </>
  );
};
