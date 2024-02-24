import type { Metadata } from "next";
import "./globals.css";
import { TokenProvider } from "../context/TokenContext";

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
