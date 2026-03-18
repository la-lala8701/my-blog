'use client';
import { useAuth } from '@/app/hooks/useAuth';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type EmailData = {
  email: string;
};

export default function ChangeEmailPage() {
  const { context, updateEmail } = useAuth();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>();

  const onSubmit: SubmitHandler<EmailData> = async (data) => {
    if (context.session?.user.email === data.email) {
      setMessage('新しいメールアドレスを入力してください')
      return;
    }
    await updateEmail(data.email);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 md:px-0">
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
              {errors.email?.type==='required' && <span>入力してください</span>}
              {errors.email?.type==='pattern' && <span>正しいメールアドレスを入力してください</span>}
            </span>
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/ })}
          ></input>
        </div>

        <p className='text-center text-sm text-red-500 mt-4'>{message}</p>

        <button
          type="submit"
          className="block ml-auto cursor-pointer mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          保存
        </button>
      </form>
      <div className="mt-8">
        <Link
          href="/user"
          className="text-blue-500 hover:underline"
        >
          ← マイページに戻る
        </Link>
      </div>
    </div>
  );
}
