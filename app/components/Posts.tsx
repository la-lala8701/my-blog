import { postData } from "../utils/placeholder-data";
import { PostsItem } from "./PostsItem";

export const Posts = () => {
  return (
    <section>
      <h2 className="text-3xl pb-6">記事一覧</h2>
      <div className="grid grid-cols-1 gap-4">
        {postData.map((post) => (
          <PostsItem key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};
