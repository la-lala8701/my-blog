'use client';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type PasswordData = {
  password: string;
  confirmation: string;
};

export default function ChangePasswordPage() {
  const { updatePassword } = useAuth();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordData>();

  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    if (data.password !== data.confirmation) {
      setMessage('パスワードが一致していません');
      return;
    }
    await updatePassword(data.password);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">パスワード変更</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 新しいパスワード */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            新しいパスワード
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {errors.password?.type === "required" && "入力してください"}
              {errors.password?.type === "pattern" && "半角英数字で設定してください"}
              {errors.password?.type === "minLength" && "6文字以上で設定してください"}
            </span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register('password', { required: true, pattern: /^[a-zA-Z0-9]+$/, minLength: 6 })}
          />
        </div>

        {/* 確認用パスワード */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            確認用パスワード
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {errors.confirmation && <span>確認は必須です</span>}
            </span>
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register('confirmation', { required: true })}
          ></input>
        </div>
        <p className='text-center text-sm text-red-500 mt-4'>{message}</p>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          保存
        </button>
      </form>
      <div className="mt-8">
        <Link
          href="/dashboard/settings"
          className="text-blue-500 hover:underline"
        >
          ← 設定ページに戻る
        </Link>
      </div>
    </div>
  );
}
