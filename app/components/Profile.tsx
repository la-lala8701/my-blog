import Avatar from 'boring-avatars';

export const Profile = ({ author }: { author: string }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-3">
        <span className='w-16 h-16 rounded-full'>
          <Avatar name={author} size={64} variant="beam" />
        </span>
        <p className="text-xl font-semibold text-center">{author}</p>
      </div>
      <div>
        <p className="mt-2 text-sm">
          ここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入りますここに自己紹介文が入ります
        </p>
      </div>
    </div>
  );
};
