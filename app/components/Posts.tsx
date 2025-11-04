import Link from "next/link";
import { PostsItem } from "./PostsItem";

export const Posts = () => {
  return (
    <div>
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <div className="grid grid-cols-1 gap-4">
        <PostsItem />
        <PostsItem />
        <PostsItem />
        <PostsItem />
      </div>
    </div>
  );
};
