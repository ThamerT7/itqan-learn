import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "إتقان - Itqan Learning",
  description: "Master Arabic letters with the Nooraniyah interactive method",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
