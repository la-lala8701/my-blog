'use client';
import Link from "next/link";
import { usePost } from "../hooks/usePost";
import { Dispatch, SetStateAction } from "react";

export const EditButtons = ({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) => {
  const { params, handleShowModal } = usePost();

  return (
    <div className="text-right mt-20">
      <Link href={`/post/${params.id}/edit`}>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer">
          記事を編集
        </button>
      </Link>
      <button
        onClick={() => handleShowModal(setShowModal)}
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
      >
        削除
      </button>
    </div>
  );
};
