"use client";
import { PostsItem } from "./PostsItem";
import { usePosts } from "../hooks/usePosts";

export const Posts = () => {
  const { posts } = usePosts();
  return (
    <section>
      <h1 className="text-3xl pb-6">記事一覧</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
