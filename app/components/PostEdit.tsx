'use client';

import { useCallback, useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { EditButtons } from './EditButtons';

export const PostEdit = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [release, setRelease] = useState(false);

  const handleClick = useCallback(() => {
    setRelease((prev) => !prev);
  }, []);

  return (
    <>
      {release ? (
        <button
          onClick={handleClick}
          className="ml-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-400 cursor-pointer block mb-12"
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
      {children}
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      <EditButtons setShowModal={setShowModal} />
    </>
  );
};
