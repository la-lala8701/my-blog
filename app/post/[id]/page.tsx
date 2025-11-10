"use client";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Article } from "@/app/components/Article";
import { useParams } from "next/navigation";
import { storageData } from "@/app/utils/storageData";
import { useCallback } from "react";

export default function Post() {
  const params = useParams();
  const posts = storageData("posts");

  const handleDelete = useCallback(() => {
    const updatedPosts = posts.filter((post) => post.id !== params.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }, []);
  return (
    <div>
      <Header />
      <Container>
        <Article />
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
      </Container>
    </div>
  );
}
