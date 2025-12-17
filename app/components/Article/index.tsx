import { PostData } from '../../types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classes from './Article.module.css';
import Avatar from 'boring-avatars';

export const Article = async ({ post }: { post: PostData }) => {
  return (
    <article className='px-4'>
      <h1 className="text-5xl leading-normal font-bold">{post?.title}</h1>
      <div className="flex items-start gap-2 mt-12">
        <div className="w-7 h-7 rounded-full">
          <Avatar name={post?.author} size={28} variant="beam" />
        </div>
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
  );
};
