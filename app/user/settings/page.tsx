import Link from 'next/link';

export default function Settings() {
  return (
    <div className='flex flex-col'>
      <h1 className="text-3xl font-bold text-center">設定</h1>
      <ul className="grow flex flex-wrap justify-center gap-4 mt-20">
        <li>
          <Link
            href="settings/profile"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            プロフィール →
          </Link>
        </li>
        <li>
          <Link
            href="settings/password"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            パスワード変更 →
          </Link>
        </li>
        <li>
          <Link
            href="settings/email"
            className="border p-4 rounded-md hover:text-blue-500 block"
          >
            メールアドレス変更 →
          </Link>
        </li>
      </ul>
    </div>
  );
}
