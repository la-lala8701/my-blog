'use client';
import { createClient } from '@/lib/supabase/client';
import { deletePostById } from '@/lib/supabaseFunctions';
import { useParams, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';

export const usePost = () => {
      const supabase = createClient();
  const params = useParams<{ id: string }>();
  const router = useRouter();

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
    await deletePostById(supabase, params.id);
    router.push('/user/posts');
  };

  return {
    params,
    handleShowModal,
    handleCancel,
    handleDelete,
  };
};
