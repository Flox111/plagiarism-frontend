import type { Metadata } from "next";
import "./globals.css";
import { TokenProvider } from "../context/TokenContext";
import { GeistSans } from "geist/font/sans";

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
    <html lang="en" className={GeistSans.className}>
      <TokenProvider>
        <body>{children}</body>
      </TokenProvider>
    </html>
  );
}
