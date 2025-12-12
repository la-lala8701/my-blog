'use client';
import { supabase } from '@/lib/supabaseFunctions';
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
    <AuthContext value={{session}}>
        {children}
    </AuthContext>
  )
};
