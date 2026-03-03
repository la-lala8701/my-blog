import { Header } from "@/app/components/layouts/Header/Auth/Header";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4">
      <Header />
      {children}
    </div>
  );
}
