export type PostData = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export type UsePostProps = {
  display_name?: string | null;
  mode: 'create' | 'edit';
  post?: PostData;
};

export type PostFormValues = {
  title: string;
  content: string;
};