import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '商談議事録テンプレートジェネレーター',
  description: '営業支援ツール - フェーズ別商談議事録作成システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} h-screen overflow-hidden`}>{children}</body>
    </html>
  );
}
