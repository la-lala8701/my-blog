"use client";
import { useEffect, useState } from "react";
import { PostData } from "../types";
import { PostsItem } from "./PostsItem";

const getPosts = (): PostData[] => {
  if (typeof window !== "undefined") {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  }
  return [];
};

export const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    setPosts(getPosts());
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
