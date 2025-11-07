'use client';
import { Params } from "next/dist/server/request/params";
import { postData } from "../utils/placeholder-data";
import { useParams } from "next/navigation";
import { PostData } from "../types";

export const Article = () => {
  const params: Params = useParams();
  const data: PostData | undefined = postData.find(
    (post) => post.id === Number(params.id)
  );

  if (!data) {
    return <div className="font-bold text-2xl">記事が見つかりません。</div>;
  }

  return (
    <article>
      <h1 className="text-5xl font-bold mb-8">{data.title}</h1>
      <div className="flex items-start gap-2">
        <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
        <div>
          <p className="text-base">{data.author}</p>
          <p className="text-sm text-gray-500">{data.date}</p>
        </div>
      </div>
      <div className="mt-16 space-y-4">
        <p>{data.content}</p>
      </div>
    </article>
  );
};
