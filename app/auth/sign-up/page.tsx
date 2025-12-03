'use client';
import { signUpUser } from '@/lib/supabaseFunctions';
import { useCallback, useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      // サインアップのロジックをここに実装
      await signUpUser(email, password);

      alert(`サインアップしました: ${email}`);
    },
    [email, password],
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">サインアップ</h1>
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
          サインアップ
        </button>
      </form>
    </>
  );
}
