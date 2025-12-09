import Link from 'next/link';

export default function Settings() {
  return (
    <div className='flex flex-col'>
      <h1 className="text-3xl font-bold text-center">設定</h1>
      <ul className="grow flex flex-wrap justify-center gap-4 mt-20">
        <li>
          <Link
            href="/dashboard/settings/profile"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            プロフィール →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings/password"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            パスワード変更 →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings/email"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            メールアドレス変更 →
          </Link>
        </li>
      </ul>
      <p className="text-center text-red-500 mt-40">
        <span className=" hover:underline cursor-pointer">
          アカウント削除
        </span>
      </p>
    </div>
  );
}
