'use client';
import { useCallback, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Logout = () => {
  const { logoutUser } = useAuth();

  const handleLogoutClick = useCallback(async () => {
    await logoutUser();
    alert('ログアウトしました。');
  }, [logoutUser]);
  return (
    <a
      className="px-4 py-3 bg-red-300 rounded-md hover:bg-red-400 cursor-pointer"
      onClick={handleLogoutClick}
    >
      ログアウト
    </a>
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <h1 className="text-2xl font-bold mb-4">ログアウト中...</h1>
    //   <p>しばらくお待ちください。</p>
    // </div>
  );
};
