"use client";
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
import { PostData } from "../../types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePosts } from "../../hooks/usePosts";
import rehypeRaw from "rehype-raw";
import classes from "./Article.module.css";

export const Article = () => {
  const { posts } = usePosts();
  const params: Params = useParams();

  const data: PostData | undefined = posts.find(
    (post) => post.id === params.id
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
      <div className="mt-10 prose prose-lg max-w-none">
        <div className={classes.markdown}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            skipHtml={false}
            rehypePlugins={[rehypeRaw]}
          >
            {data.content}
          </Markdown>
        </div>
      </div>
    </article>
  );
};
