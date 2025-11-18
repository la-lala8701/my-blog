"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { storageData } from "../utils/storageData";
import { useCallback, useState } from "react";

export const EditButtons = () => {
  const params = useParams<{ id: string }>();
  const posts = storageData("posts");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = useCallback(() => {
    alert('本当に削除しますか？')
    const updatedPosts = posts.filter((post) => post.id !== params.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }, [params.id, posts]);

  return (
    <div>
      <Link href={`/post/${params.id}/edit`}>
        <button className="mt-8 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
          記事を編集
        </button>
      </Link>
      <Link href="/">
        <button
          onClick={handleDelete}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
        >
          削除
        </button>
      </Link>
    </div>
  );
};
