import { deletePostById } from '@/lib/supabaseFunctions';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';

export const usePost = () => {
  const params = useParams<{ id: string }>();

  const handleShowModal = useCallback(
    (setFunc: Dispatch<SetStateAction<boolean>>) => {
      setFunc(true);
    },
    [],
  );
  const handleCancel = useCallback(
    (setFunc: Dispatch<SetStateAction<boolean>>) => {
      setFunc(false);
    },
    [],
  );

  const handleDelete = async () => {
    await deletePostById(params.id);
  };

  return {
    params,
    handleShowModal,
    handleCancel,
    handleDelete,
  };
};
