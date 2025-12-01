'use client';

import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { EditButtons } from './EditButtons';

export const PostWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {children}
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      <EditButtons setShowModal={setShowModal} />
    </>
  );
};
