import { createClient } from '@/lib/supabase/server';
import { HeaderNaviItems } from './HeaderNaviItems';
import Avatar from 'boring-avatars';
import { getProfileById } from '@/lib/supabaseFunctions';

export const HeaderNavi = async () => {
  // 現在のユーザー情報を取得
  const {
    data: { user },
    error,
  } = await(await createClient()).auth.getUser();
  if (error || !user) {
    console.error('認証セッションが不正です');
    return;
  }

  // プロフィールに設定された表示名の取得
  const { display_name }: { display_name: string } = await getProfileById(
    user.id,
  );
  return (
    <nav>
      <ul className="flex items-center">
        <HeaderNaviItems>
          <Avatar name={display_name} size={44} variant="beam" />
        </HeaderNaviItems>
      </ul>
    </nav>
  );
};
