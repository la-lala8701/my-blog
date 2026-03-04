'use client';
import { useCallback, useState } from 'react';

export const usePost = () => {
  const [content, setContent] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  // 内容の変更をハンドルする関数
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );

  // タブ切り替えのロジック
  const handleTabChange = useCallback(
    (selectedTab: 'write' | 'preview') => {
      setTab(selectedTab);
    },
    [setTab],
  );

  return {
    content: { content, handleContentChange },
    tab: { tab, handleTabChange },
  };
};
