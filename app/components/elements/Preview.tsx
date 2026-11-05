import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classes from '@/features/post/components/PostContent/PostContent.module.css';
import { Control, useWatch } from 'react-hook-form';
import { PostFormValues } from '@/features/post/types';

export const Preview = ({ control }: { control: Control<PostFormValues> }) => {
  const content: string = useWatch({ control, name: 'content', defaultValue: '' });

  return (
    <div className="px-5 pb-5 md:px-10 md:pb-10">
      <section className={classes.markdown}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          skipHtml={false}
          rehypePlugins={[rehypeRaw]}
        >
          { content }
        </Markdown>
      </section>
    </div>
  );
};
