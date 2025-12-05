import { supabase } from '@/lib/supabaseFunctions';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, currentSession: Session | null) => {
      setSession(currentSession);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signUpUser = async (email: string, password: string) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        throw signUpError;
      }
      await router.push('/login');
    } catch (error) {
      alert('サインアップ中にエラーが発生しました。');
      console.error('Error signing up:', error);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const {error: signInError} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
        if (signInError) { throw signInError; }
        alert(`ログインしました: ${email}`);
        await router.push('/');
    } catch (error) {
        alert('ログインに失敗しました。');
        console.error('Error signing in:', error);
    }
  };

  const logoutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Optionally, redirect to the login page or home page after logout
      await router.push('/');
    } catch (error) {
      alert('ログアウト中にエラーが発生しました。');
      console.error('Error logging out:', error);
    }
  }

  return { signUpUser, signInUser, logoutUser, session };
};
