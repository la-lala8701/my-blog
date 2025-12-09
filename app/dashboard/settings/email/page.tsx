'use client';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type EmailData = {
  password: string;
  confirmation: string;
};

export default function ChangeEmailPage() {
  const { context, updatePassword } = useAuth();
  const [message, setMessage] = useState('');
  console.log(context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>();

    const onSubmit: SubmitHandler<EmailData> = async (data) => {
      if (data.password !== data.confirmation) {
        setMessage('メールアドレスが一致していません');
        return;
      }
      await updatePassword(data.password);
      alert('メールアドレスが変更されました');
    };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        メールアドレス変更
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 現在のメールアドレス */}
        <dl className="mt-6">
          <dt className="text-sm font-medium text-gray-700">
            現在のメールアドレス
          </dt>
          <dd className="text-md mt-1">{context.session?.user.email}</dd>
        </dl>

        {/* 新しいメールアドレス */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            新しいメールアドレス
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {errors.confirmation && <span>入力してください</span>}
              {}
            </span>
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register('confirmation', { required: true })}
          ></input>
        </div>
        <p className="text-center text-sm text-red-500 mt-4">{message}</p>
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
