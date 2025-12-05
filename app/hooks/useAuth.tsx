'use client';
import { supabase } from '@/lib/supabaseFunctions';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();

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
        alert('サインイン中にエラーが発生しました。');
        console.error('Error signing in:', error);
    }
  };

  return { signUpUser, signInUser };
};
