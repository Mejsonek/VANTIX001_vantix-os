export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-void items-center justify-center relative">
      <div className="grid-bg" />
      <div className="grain" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
