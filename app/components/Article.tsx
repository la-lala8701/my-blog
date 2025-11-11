"use client";
import { Params } from "next/dist/server/request/params";
import { useParams } from "next/navigation";
import { PostData } from "../types";
import { useEffect, useState } from "react";
import { storageData } from "../utils/storageData";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePosts } from "../hooks/usePosts";

const renders = {
  h1: ({ ...props }) => <h1 className="text-4xl font-bold my-6" {...props} />,
  h2: ({ ...props }) => <h2 className="text-3xl font-bold my-5" {...props} />,
  h3: ({ ...props }) => <h3 className="text-2xl font-bold my-4" {...props} />, 
  h4: ({ ...props }) => <h4 className="text-xl font-bold my-3" {...props} />,
  h5: ({ ...props }) => <h5 className="text-lg font-bold my-2" {...props} />,
  h6: ({ ...props }) => <h6 className="text-base font-bold my-1" {...props} />,
  a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
  table: ({ ...props }) => <table className="table-auto border-collapse border border-gray-300 my-4" {...props} />,
  th: ({ ...props }) => <th className="border border-gray-300 bg-gray-200 px-4 py-2" {...props} />,
  td: ({ ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
  tr: ({ ...props }) => <tr className="odd:bg-white even:bg-gray-100" {...props} />,
  tableBody: ({ ...props }) => <tbody {...props} />,
  tableHead: ({ ...props }) => <thead {...props} />, 
};

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
        <Markdown remarkPlugins={[remarkGfm]} components={renders}>{data.content}</Markdown>
      </div>
    </article>
  );
};
