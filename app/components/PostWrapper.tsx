'use client';

import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { EditButtons } from './EditButtons';
import { useAuth } from '../hooks/useAuth';

export const PostWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const { context } = useAuth();
  return (
    <>
      {children}
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
      {context.session ? <EditButtons setShowModal={setShowModal} /> : null}
    </>
  );
};
