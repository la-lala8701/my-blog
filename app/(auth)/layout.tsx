import { HeaderAuth } from '../components/HeaderAuth';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4">
      <HeaderAuth />
      {children}
    </div>
  );
}
