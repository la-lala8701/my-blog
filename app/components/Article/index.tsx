'use client';
import { PostData } from '../../types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classes from './Article.module.css';
import { usePost } from '@/app/hooks/usePost';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getPostById } from '@/app/utils/supabaseFunctions';
import { EditButtons } from '../EditButtons';

export const Article = ({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) => {
  const { params } = usePost();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const getPost = async () => {
      const post = await getPostById(params.id);
      setPost(post);
    };
    getPost();
  }, [params.id]);

  if (!post) return <div>ローディング中...</div>;

  return (
    <>
      <article>
        <h1 className="text-5xl leading-normal font-bold">{post?.title}</h1>
        <div className="flex items-start gap-2 mt-12">
          <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
          <div>
            <p className="text-base">{post?.author}</p>
            <p className="text-sm text-gray-500">{post?.created_at}</p>
          </div>
        </div>
        <div className="mt-28 prose prose-lg max-w-none">
          <section className={classes.markdown}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              skipHtml={false}
              rehypePlugins={[rehypeRaw]}
            >
              {post?.content}
            </Markdown>
          </section>
        </div>
      </article>
      <EditButtons setShowModal={setShowModal} />
    </>
  );
};
