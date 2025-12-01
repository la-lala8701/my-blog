'use client';
import { PostData } from '@/app/types';
import { getPostById, updatePostById } from '@/app/utils/supabaseFunctions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// import { title } from 'process';
// import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';

export const EditPost = ({ id }: { id: string }) => {
  // const params = useParams();
  //   const [posts, setPosts] = useState<PostData[]>([]);
  const [editPost, setEditPost] = useState<PostData | undefined>(undefined);

  useEffect(() => {
    // 編集する記事を特定
    const getPost = async () => {
      if (!id) return;
      const post = await getPostById(id);
      setEditPost(post);
      console.log(id);
    };
    getPost();
    // const postToEdit: PostData | undefined = posts.find(
    //   (post) => post.id === id,
    // );
    // if (!postToEdit) return; // 記事が見つからない場合は何もしない
    // setEditPost(postToEdit); // 編集する記事の状態を設定
  }, [id]);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditPost((prevPost) =>
        prevPost ? { ...prevPost, title: e.target.value } : prevPost,
      );
    },
    [],
  );

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditPost((prevPost) =>
        prevPost ? { ...prevPost, content: e.target.value } : prevPost,
      );
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!editPost) return; // 編集する記事がない場合は何もしない

      // ここで記事編集のロジックを実装します
      await updatePostById(id, editPost);
      // setPosts((prevPosts) =>
      //   prevPosts.map((post) => (post.id === editPost.id ? editPost : post))
      // );
      // localStorage.setItem(
      //   "posts",
      //   JSON.stringify(
      //     posts.map((post) => (post.id === editPost.id ? editPost : post))
      //   )
      // );
      //   alert("記事が更新されました！");
      //   location.href = `/pages/post/${id}`;
    },
    [id, editPost],
  );

  if (!editPost) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">記事編集ページ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="title">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editPost.title}
            onChange={handleChangeTitle}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="content">
            内容
          </label>
          <textarea
            id="content"
            name="content"
            value={editPost.content}
            onChange={handleChangeContent}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          更新
        </button>
      </form>
      <Link href={`/pages/post/${id}`}>
        <button className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer">
          記事詳細に戻る
        </button>
      </Link>
    </>
  );
};
