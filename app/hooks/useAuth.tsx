'use client'; 
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createBrowserSupabase } from '@/lib/supabase/client';

export const useAuth = () => {
  const router = useRouter();

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthはAuthProvider内で使用する必要があります');
  }

  const signUpUser = async (email: string, password: string) => {
    try {
      const supabase = createBrowserSupabase();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        throw signUpError;
      }
      alert('サインアップしました');
      router.push('/user/settings/profile');
    } catch (error) {
      alert(`サインアップ中にエラーが発生しました。(${error})`);
      console.error('Error signing up:', error);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const supabase = createBrowserSupabase();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        throw signInError;
      }
      alert(`ログインしました: ${email}`);
      router.push('/user');
    } catch (error) {
      alert('ログインに失敗しました。');
      console.error('Error signing in:', error);
    }
  };

  const logoutUser = async () => {
    try {
      const supabase = createBrowserSupabase();
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
  };

  const updatePassword = async (password: string) => {
    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        throw error;
      }
      alert('パスワードが変更されました');
      router.refresh();
    } catch (error) {
      alert('パスワード更新中にエラーが発生しました');
      console.error('Password Change Error:', error);
    }
  };

  const updateEmail = async (email: string) => {
    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.auth.updateUser({
        email,
      });
      if (error) {
        throw error;
      }
      alert('メールアドレスが変更されました');
      router.refresh();
    } catch (error) {
      alert('設定メールアドレス更新中にエラーが発生しました');
      console.error('Email Change Error:', error);
    }
  };

  return {
    signUpUser,
    signInUser,
    logoutUser,
    context,
    updatePassword,
    updateEmail,
  };
};
