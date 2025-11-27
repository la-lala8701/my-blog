'use client';
import Link from 'next/link';
import { usePost } from '../hooks/usePost';

export const DeleteModal = () => {
  const { showModal, handleCancel, handleDecisiton } = usePost();

  if (showModal) {
    return (
      <div className="bg-black/50 fixed top-0 right-0 left-0 bottom-0">
        <dl className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-lg">
          <dt className="px-6 py-4 bg-red-500 text-white font-bold text-2xl rounded-t-lg">
            削除確認！
          </dt>
          <dd className="px-6 py-4">
            <p className="text-lg">
              削除すると元に戻すことはできません。よろしいですか？
            </p>
            <div className="flex gap-3 justify-end mt-12 mb-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer inline-block"
              >
                いいえ
              </button>
              <Link
                href="/"
                onClick={handleDecisiton}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer inline-block"
              >
                はい
              </Link>
            </div>
          </dd>
        </dl>
      </div>
    );
  }
};
