import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantix OS",
  description: "Centrum Sterowania",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
