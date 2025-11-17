"use client";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { PostData } from "../types";
import { storageData } from "../utils/storageData";

type ChangeValue = typeof initialState;

type Action =
  | { type: "change_author"; nextValue: string }
  | { type: "change_title"; nextValue: string }
  | { type: "change_content"; nextValue: string }
  | { type: "full"; date: string }
  | { type: "finished" }
  | { type: "send"; id: string };

const initialState = {
  id: "",
  title: "",
  content: "",
  author: "",
  date: "",
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
    case "full":
      return {
        id: state.id,
        title: state.title,
        content: state.content,
        author: state.author,
        date: state.date,
      };
    case "finished":
      return {
        ...state,
        title: "",
        content: "",
        author: "",
      };
    case "send":
      return {
        ...state,
        id: action.id,
      };
  }
};

export default function CreatePage() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState(() => storageData("posts"));
  // const [id, setId] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChangeAuthor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // setAuthor(e.target.value);
      dispatch({ type: "change_author", nextValue: e.target.value });
    },
    []
  );

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // setTitle(e.target.value);
      dispatch({ type: "change_title", nextValue: e.target.value });
    },
    []
  );

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // setContent(e.target.value);
      dispatch({ type: "change_content", nextValue: e.target.value });
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // const id: string = uuidv4();
      // setId(id);
      dispatch({ type: "send", id: uuidv4() });

      // const date: string = new Date().toLocaleString("ja-JP").split(" ")[0];

      // ここで記事作成のロジックを実装します
      if (!state.title || !state.content || !state.author) {
        alert("全てのフィールドを入力してください。");
        return;
      }

      const newPost: PostData = {
        id: state.id,
        title: state.title,
        content: state.content,
        author: state.author,
        date: state.date,
      };

      setPosts((prevPosts) => [...prevPosts, newPost]);
      dispatch({
        type: "full",
        date: new Date().toLocaleString("ja-JP").split(" ")[0],
      });

      // フォームをリセット
      dispatch({ type: "finished" });
      // setTitle("");
      // setContent("");
      // setAuthor("");
      alert("記事が作成されました！");

      location.href = `/post/${state.id}`;
    },
    [state.title, state.content, state.author]
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-2xl font-bold mb-4">記事作成</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          action={`/post/${state.id}`}
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
    </div>
  );
}
