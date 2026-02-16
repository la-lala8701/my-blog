'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { GuestHeader } from '@/app/components/Header/GuestHeader';
import { LoginHeader } from '@/app/components/Header/LoginHeader';
import { useEffect, useState } from 'react';
import { getProfileById } from '@/lib/supabaseFunctions';
import { ProfileData } from '@/app/types';
import { createBrowserSupabase } from '@/lib/supabase/client';

export const HeaderNavi = () => {
  const supabase = createBrowserSupabase();
  const {
    context: { session },
  } = useAuth();

  const [profiles, setProfiles] = useState<ProfileData | null>(null);

  useEffect(() => {
    // 未ログインなら何もしない
    if (!session?.user) return;
    // 初回取得
    getProfileById(supabase, session.user.id).then((profile) => {
      setProfiles(profile);
    });
    // RealTimeでプロフィール更新を監視
    const profileSubscription = supabase
      .channel('public:profiles')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
        (payload) => {
          setProfiles(payload.new as ProfileData);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileSubscription);
    };

  }, [session?.user, supabase]);

  if (session) {
    return <LoginHeader profiles={profiles} userEmail={session.user.email} />;
  }

  return <GuestHeader />;
};
