"use client";
import { useCallback, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { PostData } from "@/app/types";
import { storageData } from "@/app/utils/storageData";
import { Container } from "@/app/components/Container";

type ChangeValue = {
  title: string;
  content: string;
  author: string;
  posts: PostData[];
};

type Action =
  | { type: "change_author"; nextValue: string }
  | { type: "change_title"; nextValue: string }
  | { type: "change_content"; nextValue: string }
  | { type: "finished"; newPost: PostData };

const init = (): ChangeValue => {
  return {
    title: "",
    content: "",
    author: "",
    posts: storageData("posts"),
  };
};

const reducer = (state: ChangeValue, action: Action) => {
  switch (action.type) {
    case "change_author":
      return {
        ...state,
        author: action.nextValue,
      };
    case "change_title":
      return {
        ...state,
        title: action.nextValue,
      };
    case "change_content":
      return {
        ...state,
        content: action.nextValue,
      };
    case "finished":
      return {
        ...state,
        title: "",
        content: "",
        author: "",
        posts: [...state.posts, action.newPost],
      };
  }
};

export default function CreatePage() {
  const [state, dispatch] = useReducer(reducer, null, init);
  const id: string = uuidv4();
  const date: string = new Date().toLocaleString("ja-JP").split(" ")[0];
  // 新規データ
  const newPost: PostData = {
    id: id,
    title: state.title,
    content: state.content,
    author: state.author,
    date: date,
  };

  const handleChangeAuthor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "change_author", nextValue: e.target.value });
    },
    []
  );

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "change_title", nextValue: e.target.value });
    },
    []
  );

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "change_content", nextValue: e.target.value });
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 全てのフィールドに入力されているか確認
      if (!state.title || !state.content || !state.author) {
        alert("全てのフィールドを入力してください。");
        return;
      }

      // 新規データを追加し、フォームをリセット
      dispatch({ type: "finished", newPost });
      alert("記事が作成されました！");
      location.href = `/post/${id}`;
    },
    [state.title, state.content, state.author]
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(state.posts));
  }, [state.posts]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">記事作成</h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        action={`/post/${id}`}
        suppressHydrationWarning
      >
        <div>
          <label className="block mb-1">著者名</label>
          <input
            type="text"
            value={state.author}
            onChange={handleChangeAuthor}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">タイトル</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            value={state.title}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <label className="block mb-1">内容</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            rows={10}
            value={state.content}
            placeholder="マークダウンで内容を記載してください（GitHub Flavored Markdownをサポートしています）"
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
  );
}
