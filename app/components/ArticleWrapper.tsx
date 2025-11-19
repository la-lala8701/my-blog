"use client";
import { Article } from "@/app/components/Article";
import { EditButtons } from "@/app/components/EditButtons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { storageData } from "../utils/storageData";

export const ArticleWrapper = () => {
  const params = useParams<{ id: string }>();
  const posts = storageData("posts");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = useCallback(() => {
    setShowModal(true);
  }, []);
  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);
  const handleDecisiton = useCallback(() => {
    const updatedPosts = posts.filter((post) => post.id !== params.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }, [params.id, posts]);

  return (
    <>
      {showModal ? (
        <div className="bg-black/50 fixed top-0 right-0 left-0 bottom-0">
          <dl className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-lg">
            <dt className="px-6 py-4 bg-red-500 text-white font-bold text-2xl rounded-t-lg">
              削除確認！
            </dt>
            <dd className="px-6 py-4">
              <p className="text-lg">
                削除すると元に戻すことはできません。よろしいですか？
              </p>
              <div className="flex gap-3 justify-end mt-12 mb-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 cursor-pointer inline-block"
                >
                  いいえ
                </button>
                <Link
                  href="/"
                  onClick={handleDecisiton}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer inline-block"
                >
                  はい
                </Link>
              </div>
            </dd>
          </dl>
        </div>
      ) : null}

      <Article />
      <EditButtons onDelete={handleDelete} params={params.id} />
    </>
  );
};
