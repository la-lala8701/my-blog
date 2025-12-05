import Link from 'next/link';

export default function ManagePosts() {
  return (
    <div>
      <p className="text-right mb-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </p>
      <h1 className="text-4xl font-bold mb-8">投稿一覧</h1>
      <p className="text-lg text-gray-600">Here you can manage your posts.</p>
    </div>
  );
}
