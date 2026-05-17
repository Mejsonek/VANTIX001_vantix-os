import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VANTIX — System Operacyjny dla Nowoczesnego Biznesu",
  description: "Eliminujemy wąskie gardła w przepływie danych. Projektujemy architekturę, która przejmuje logikę decyzyjną i optymalizuje marżę w czasie rzeczywistym.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
