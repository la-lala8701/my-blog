import Link from 'next/link';
import { PostData } from '../types';
import Avatar from 'boring-avatars';

type Props = PostData & { manage?: boolean };

export const PostsItem = (props: Props) => {
  console.log(props.is_published);
  
  return (
    <article>
      <Link
        href={props.manage ? `/user/post/${props.id}` : `/post/${props.id}`}
        className={`block border-2 rounded-lg p-4 ${props.manage && props.is_published ? 'border-indigo-400 bg-indigo-100 hover:bg-indigo-200' : 'border-gray-300 hover:bg-gray-100'}`}
      >
        <div className='flex justify-between items-center mb-3'>
          <h2 className="text-xl font-bold">{props.title}</h2>
          {props.manage && props.is_published ? <span className="inline-block px-2 py-1 text-xs bg-indigo-500 text-white rounded-full">公開中</span> : props.manage && !props.is_published ? <span className="inline-block px-2 py-1 text-xs bg-gray-500 text-white rounded-full">非公開</span> : null}
        </div>
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full">
            <Avatar name={props.author} size={28} variant="beam" />
          </div>
          <div>
            <p className="text-base">{props.author}</p>
            <p className="text-sm text-gray-500">{props.created_at}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};
