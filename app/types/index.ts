export type PostData = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  is_published: boolean;
}

export type ProfileData = {
  id: string;
  display_name: string;
  description: string;
};