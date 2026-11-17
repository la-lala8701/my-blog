'use client';
import { useCallback, useState } from 'react';

export const usePost = () => {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  // タブ切り替えのロジック
  const handleTabChange = useCallback(
    (selectedTab: 'write' | 'preview') => {
      setTab(selectedTab);
    },
    [setTab],
  );

  return { tab, handleTabChange };
};
