"use client";
import { useCallback, useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { PostData } from "../types";
import { storageData } from "../utils/storageData";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState(() => storageData("posts"));

  const handleChangeAuthor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor(e.target.value);
    },
    []
  );

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const id: string = uuidv4();
      const date: string = new Date().toLocaleString("ja-JP").split(" ")[0];
      // ここで記事作成のロジックを実装します
      if (!title || !content || !author) {
        alert("全てのフィールドを入力してください。");
        return;
      }

      const newPost: PostData = {
        id: id,
        title: title,
        content: content,
        author: author,
        date: date,
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);

      // フォームをリセット
      setTitle("");
      setContent("");
      setAuthor("");
      alert("記事が作成されました！");
    },
    [title, content, author]
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-2xl font-bold mb-4">記事作成</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">著者名</label>
            <input
              type="text"
              value={author}
              onChange={handleChangeAuthor}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">タイトル</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text"
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <div>
            <label className="block mb-1">内容</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              rows={10}
              value={content}
              onChange={handleChangeContent}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
          >
            作成
          </button>
          <Link href="/" className="ml-4 text-gray-500 hover:underline">
            キャンセル
          </Link>
        </form>
      </Container>
    </div>
  );
}
