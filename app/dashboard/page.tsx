import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Welcome to your dashboard! Here you can manage your posts and view your
        profile.
      </p>
      <ul className="flex flex-wrap gap-6 justify-center mt-16">
        <li>
          <Link
            href="/dashboard/posts"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            Manage Posts →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            Go to Profile →
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className="border p-4 rounded-md hover:text-blue-500"
          >
            Go to Settings →
          </Link>
        </li>
      </ul>
    </div>
  );
}
