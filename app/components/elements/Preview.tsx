import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classes from '@/features/post/components/PostContent/PostContent.module.css';

export const Preview = ({ content }: { content: string }) => {

  return (
    <div className="px-10 pb-10">
      <section className={classes.markdown}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          skipHtml={false}
          rehypePlugins={[rehypeRaw]}
        >
          {content}
        </Markdown>
      </section>
    </div>
  );
};
