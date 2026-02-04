export type PostData = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export type ProfileData = {
  id: string;
  display_name: string;
  description: string;
  avatar_url?: string;
};

export type PostFormValues = {
  title: string;
  content: string;
};

export type AuthInputType = {
  email: string;
  password: string;
};

export type ModalContent = {
  title: string;
  message: string;
  bgColor: string;
  hoverColor: string;
  handleAction: () => Promise<void>;
};