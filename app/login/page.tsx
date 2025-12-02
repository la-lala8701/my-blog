'use client';
import { createClient } from "@/lib/supabase/client";
import { signInUser } from "@/lib/supabaseFunctions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // ログインのロジックをここに実装
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      

      if (error) {
        setMessage(`ログイン失敗: ${error.message}`);
        console.log(`ログイン失敗: ${error.message}`);
        
      } else {
        setMessage(`ログイン成功: ${email}`);
        router.push('/');
      }
    },
    [email, password, router],
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
        >
          ログイン
        </button>
      </form>
    </>
  );
}
