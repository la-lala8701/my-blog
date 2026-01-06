'use client';
import { useAuth } from '../hooks/useAuth';
import { GuestHeader } from './GuestHeader';
import { AuthHeader } from './AuthHeader';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getProfileById } from '@/lib/supabaseFunctions';

export const HeaderNavi = () => {
  const supabase = createClient();
  const {
    context: { session },
  } = useAuth();

  const [displayName, setDisplayName] = useState(undefined);

  useEffect(() => {
    // 未ログインなら何もしない
    if (!session?.user) return;
    // ユーザーの表示名を取得してstateにセット
    getProfileById(supabase, session.user.id).then((profile) => {
      setDisplayName(profile?.display_name);
    });

  }, [session?.user, supabase]);

  if (session) {
    return <AuthHeader displayName={displayName} />;
  }

  return <GuestHeader />;
};
