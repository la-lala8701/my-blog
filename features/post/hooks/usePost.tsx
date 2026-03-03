'use client';

import { useCallback, useState } from 'react';

export const usePost = () => {
  const [content, setContent] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [],
  );

  const handleTabChange = useCallback(
    (selectedTab: 'write' | 'preview') => {
      setTab(selectedTab);
    },
    [setTab],
  );
  return { content, handleContentChange, tab, handleTabChange };
};
