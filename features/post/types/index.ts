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

export type SubmitResult =
| { success: true; id?: string }
| { success: false; error: string };

export type GetPostByIdResult =
| { success: false; code: string }
| { success: true; data: PostData };