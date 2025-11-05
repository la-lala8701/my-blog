import Link from "next/link";
import { PostData } from "../utils/placeholder-data";

export const PostsItem = (props: PostData) => {
  return (
    <article className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-100">
        <Link href={`/post/${props.id}`} className="block">
          <h3 className="text-xl font-bold mb-3">{props.title}</h3>
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
            <div>
              <p className="text-base">{props.author}</p>
              <p className="text-sm text-gray-500">{props.date}</p>
            </div>
          </div>
        </Link>
    </article>
  );
}