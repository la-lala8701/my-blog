export type ProfileData = {
  id: string;
  display_name: string;
  description: string;
  avatar_url?: string;
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