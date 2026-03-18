'use client';
import { UserAvatar } from '@/app/components/elements/UserAvatar';
import { ProfileData } from '../types';
import { AvatarSettings } from './AvatarSettings';
import { User } from '@supabase/supabase-js';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';

export const AvatarPostAction = ({
  children,
  profiles,
  user,
}: {
  children: React.ReactNode;
  profiles: ProfileData;
  user: User;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const avatarChangeRef = useRef<HTMLDivElement>(null);

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const element = avatarChangeRef.current;
    if (!isOpen || element?.contains(e.target as Node)) {
      return;
    }
    setIsOpen(false);
  }, [isOpen]);

  const handleAvatarClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div>
      {/* アイコン画像 */}
      <div className="w-32 h-32 block mx-auto rounded-full relative overflow-hidden text-transparent hover:text-white">
        <span
          className="block w-32 h-32 hover:brightness-50 transition duration-300 cursor-pointer"
          onClick={handleAvatarClick}
        >
          <UserAvatar profiles={profiles} avatarSize={128} />
        </span>
        <span className="inline-block py-0.5 px-1.5 rounded-md border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          編集
        </span>
      </div>
      {children}
      {isOpen ? (
        <div
          className="fixed bg-black/80 w-full h-full top-0 left-0 z-10 flex items-center justify-center px-4"
          onClick={handleClickOutside}
        >
          <div
            ref={avatarChangeRef}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative"
          >
            <AvatarSettings user={user} profiles={profiles} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
