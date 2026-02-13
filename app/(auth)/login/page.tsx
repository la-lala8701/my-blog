'use client';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';
import { AuthInputType } from '@/app/types';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function LoginPage() {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputType>();

  const onSubmit: SubmitHandler<AuthInputType> = async (data) => {
    await signInUser(data.email, data.password);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl text-center font-bold mb-6">ログイン</h1>
      <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">
            メールアドレス
            {errors.email && (
              <>
                <span className="text-red-500">*</span>
                <span className="ml-2 text-sm text-red-500">
                  入力してください
                </span>
              </>
            )}
          </label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2 w-full"
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">
            パスワード
            {errors.password && (
              <>
                <span className="text-red-500">*</span>
                <span className="ml-2 text-sm text-red-500">
                  入力してください
                </span>
              </>
            )}
          </label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            {...register('password', { required: true })}
          />
        </div>
        <Link
          href="/forgot-password"
          className="text-blue-500 text-sm hover:underline mb-6 block"
        >
          パスワードを忘れた方
        </Link>
        <button
          type="submit"
          className="block w-full cursor-pointer bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
      <Link href="/sign-up" className="block text-gray-500 underline text-center border-t pt-6 border-gray-300">
        新規登録はこちら
      </Link>
    </div>
  );
}
