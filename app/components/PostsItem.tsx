import Link from "next/link";
import { PostData } from "../types";

export const PostsItem = (props: PostData) => {
  return (
    <article>
        <Link href={`/pages/post/${props.id}`} className="block border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-100">
          <h2 className="text-xl font-bold mb-3">{props.title}</h2>
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
            <div>
              <p className="text-base">{props.author}</p>
              <p className="text-sm text-gray-500">{props.created_at}</p>
            </div>
          </div>
        </Link>
    </article>
  );
}