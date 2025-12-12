'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const { signUpUser } = useAuth();
  useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleDisplayNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayName(e.target.value);
    },
    [],
  );

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
      if (!displayName) {
        alert('表示名を入力してください。');
        return;
      }
      await signUpUser(email, password, displayName);
    },
    [email, password, displayName, signUpUser],
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">サインアップ</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">表示名</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleDisplayNameChange}
            placeholder="任意の表示名を設定してください"
          />
        </div>
        <div>
          <label className="block mb-1">メールアドレス</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleEmailChange}
            placeholder="メールアドレスを設定してください"
          />
        </div>
        <div>
          <label className="block mb-1">パスワード</label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handlePasswordChange}
            placeholder="6桁以上の半角英数字でパスワードを設定してください"
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
