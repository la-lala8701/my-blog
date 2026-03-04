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