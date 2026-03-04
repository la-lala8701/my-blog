'use client';
import { ProfileData } from '@/features/profile/types';
import { useProfileForm } from '../hooks/useProfileForm';

export const ProfileSettings = (props: ProfileData) => {
  const { handleSubmit, register, errors, onSubmit } = useProfileForm({ id: props.id });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            表示名
            <span className="text-red-500">*</span>
            <span className="ml-2 text-sm text-red-500">
              {errors.display_name && <span>必須項目です</span>}
            </span>
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="表示名を入力してください"
            defaultValue={props.display_name}
            {...register('display_name', { required: true })}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            自己紹介文
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows={4}
            placeholder="自己紹介文を入力してください"
            defaultValue={props.description}
            {...register('description')}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block ml-auto cursor-pointer"
        >
          保存
        </button>
      </form>
    </div>
  );
};
