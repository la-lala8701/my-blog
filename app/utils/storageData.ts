import { PostData } from "../types";

export const storageData = (key: "posts"): PostData[] => {
  if (typeof window !== "undefined") {
    const storedPosts = localStorage.getItem(key);
    return storedPosts ? JSON.parse(storedPosts) : [];
  }
  return [];
}