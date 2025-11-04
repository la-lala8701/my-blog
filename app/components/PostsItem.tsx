import Link from "next/link";

export const PostsItem = () => {
  return (
    <article className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-100">
        <Link href="/about">
          <h3 className="text-xl font-bold mb-3">タイトルが入ります</h3>
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
            <div>
              <p className="text-base">UserName</p>
              <p className="text-sm text-gray-500">2025年04月08日</p>
            </div>
          </div>
        </Link>
    </article>
  );
}