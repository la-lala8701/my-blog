import { Header } from "./Header";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>;
    </>
  );
};
