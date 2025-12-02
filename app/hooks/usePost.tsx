import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { deletePostById } from '../lib/supabaseFunctions';

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

  const handleDelete = useCallback(async () => {
    await deletePostById(params.id);
  }, [params.id]);

  return {
    params,
    handleShowModal,
    handleCancel,
    handleDelete,
  };
};
