"use client";
import { useEffect, useState } from "react";
import { PostData } from "../types";
import { PostsItem } from "./PostsItem";
import { storageData } from "../utils/storageData";

export const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    setPosts(storageData("posts"));
  }, []);
  return (
    <section>
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <div className="grid grid-cols-1 gap-4" suppressHydrationWarning={true}>
        {posts.map((post) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
