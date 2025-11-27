import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePosts } from './usePosts';

export const usePost = () => {
  const params = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const { posts } = usePosts();

  const handleDelete = useCallback(() => {
    setShowModal(true);
  }, []);
  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleDecisiton = useCallback(() => {
    const updatedPosts = posts.filter((post) => post !== params);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }, [params, posts]);

  return {
    params,
    showModal,
    posts,
    handleDelete,
    handleCancel,
    handleDecisiton,
  };
};
