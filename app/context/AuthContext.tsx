'use client';
import { createBrowserSupabase } from '@/lib/supabase/browser';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

type AuthContextType = {
    session: Session | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [session, setSession] = useState<Session | null>(null);
  // console.log("AuthProviderがレンダリングされました");
  

  useEffect(() => {
    const supabase = createBrowserSupabase();
    const { data } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
      },
    );
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{session}}>
        {children}
    </AuthContext.Provider>
  )
};
