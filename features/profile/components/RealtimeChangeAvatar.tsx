'use client';

import { ProfileData } from '../types';
import React, { useCallback, useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase/client';
import { getProfileById } from '@/lib/supabaseFunctions';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type RealtimeChangeAvatarProps = {
  userId: string;
  profiles: ProfileData | null;
  children: (profile: ProfileData | null) => React.ReactNode;
};

export const RealtimeChangeAvatar: React.FC<RealtimeChangeAvatarProps> = ({ children, userId, profiles }) => {
  const [profile, setProfile] = useState<ProfileData | null>(profiles);

  const supabase = createBrowserSupabase();

  interface AppPayload {
    eventType: string;
    new: { [key: string]: any } | null;
  }

  // リアルタイム更新ハンドラ
  const handleRealtimeUpdate = useCallback((
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>,
  ) => {
    // イベントタイプに応じた処理
    const { eventType, new: newRecord }: AppPayload = payload;
    // newRecordをProfileData型にキャスト
    const newRecordTyped = newRecord as ProfileData | null;
    if (!newRecordTyped) return; // newRecordがnullの場合は処理しない

    if (eventType === 'INSERT') {
      // 新しいアバターが追加された場合
      setProfile(newRecordTyped);
    } else if (eventType === 'UPDATE') {
      // アバターが更新された場合
      setProfile(newRecordTyped);
    } else if (eventType === 'DELETE') {
      // アバターが削除された場合
      setProfile(null);
    } else {
      console.warn('未知のイベントタイプ:', eventType);
    }
  }, []);

  useEffect(() => {
    // 初期データの取得
    getProfileById(supabase, userId);

    // リアルタイム購読のセットアップ
    const subscription = supabase
      .channel('profiles-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        (payload) => {
          console.log('変更を受信:', payload);
          // 変更に応じてUIを更新
          handleRealtimeUpdate(payload);
        },
      )
      .subscribe();

    // クリーンアップ関数
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, userId, handleRealtimeUpdate]);

  return <div>{children(profile)}</div>;
};
