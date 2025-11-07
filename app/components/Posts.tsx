"use client";
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
  const postsFromStorage: PostData[] = getPosts();
  console.log(postsFromStorage);
  
  return (
    <section>
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <div className="grid grid-cols-1 gap-4">
        {postsFromStorage.map((post) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
