'use client';
import { useAuth } from '@/app/hooks/useAuth';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignupData = {
  email: string;
  password: string;
};

export default function SignupPage() {
  const { signUpUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    await signUpUser(data.email, data.password);
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">サインアップ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4 mb-8'>
          <div>
            <label className="block mb-1">
              メールアドレス
              <span className="text-red-500">*</span>
              <span className="ml-2 text-sm text-red-500">
                {errors.email?.type === 'required' && (
                  <span>入力してください</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span>正しいメールアドレスを入力してください</span>
                )}
              </span>
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="メールアドレスを設定してください"
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              })}
            />
          </div>
          <div>
            <label className="block mb-1">
              パスワード
              <span className="text-red-500">*</span>
              <span className="ml-2 text-sm text-red-500">
                {errors.password?.type === 'required' && '入力してください'}
                {errors.password?.type === 'pattern' &&
                  '半角英数字で設定してください'}
                {errors.password?.type === 'minLength' &&
                  '6文字以上で設定してください'}
              </span>
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="6桁以上の半角英数字でパスワードを設定してください"
              {...register('password', {
                required: true,
                pattern: /^[a-zA-Z0-9]+$/,
                minLength: 6,
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-3 ml-auto block hover:bg-blue-600 cursor-pointer"
        >
          サインアップ
        </button>
      </form>
    </div>
  );
}
