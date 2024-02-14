import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TokenProvider } from "./context/TokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plagiarism checker",
  description: "Created by Maltsev A.N.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TokenProvider>
        <body>{children}</body>
      </TokenProvider>
    </html>
  );
}
