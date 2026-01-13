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
    // 初回取得
    getProfileById(supabase, session.user.id).then((profile) => {
      setDisplayName(profile?.display_name);
    });
    // RealTimeでプロフィール更新を監視
    const profileSubscription = supabase
      .channel('public:profiles')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
        (payload) => {
          setDisplayName(payload.new.display_name);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileSubscription);
    };

  }, [session?.user, supabase]);

  if (session) {
    return <AuthHeader displayName={displayName} userEmail={session.user.email} />;
  }

  return <GuestHeader />;
};
