'use client';
import { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInUser } = useAuth();

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
      await signInUser(email, password);
    },
    [email, password, signInUser],
  );

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl text-center font-bold mb-6">ログイン</h1>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleEmailChange}
          />
        </div>
        <div className='mb-8'>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="submit"
          className="block w-full cursor-pointer bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
      <ul>
        <li className="mt-2">
          <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
            パスワードをお忘れですか？
          </Link>
        </li>
        <li>
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            アカウントをお持ちでないですか？登録はこちら
          </Link>
        </li>
      </ul>
    </div>
  );
}
