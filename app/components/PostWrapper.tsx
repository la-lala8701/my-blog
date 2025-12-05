'use client';

import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { EditButtons } from './EditButtons';
import { useAuth } from '../hooks/useAuth';

export const PostWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const { session } = useAuth();
  return (
    <>
      {children}
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      {session ? <EditButtons setShowModal={setShowModal} /> : null}
    </>
  );
};
