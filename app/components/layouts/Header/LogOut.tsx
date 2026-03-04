'use client';
import { useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Logout = () => {
  const { logoutUser } = useAuth();

  const handleLogoutClick = useCallback(async () => {
    await logoutUser();
  }, [logoutUser]);
  return (
    <a
      className="px-4 py-3 block bg-red-300 text-center rounded-md hover:bg-red-400 cursor-pointer"
      onClick={handleLogoutClick}
    >
      ログアウト
    </a>
  );
};
