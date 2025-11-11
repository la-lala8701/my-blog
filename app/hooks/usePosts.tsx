import { useEffect, useState } from "react";
import { storageData } from "../utils/storageData";
import { PostData } from "../types";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    setPosts(storageData("posts"));
  }, []);

  return { posts}
};
