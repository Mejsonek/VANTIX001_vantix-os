import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Cockpit | Vantix OS",
  description: "Centrum sterowania - taski, kalendarz, priorytety, rekomendacje AI",
};

export default function CockpitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
