import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 생존 지수 - 맞춤형 생존 전략 플래너',
  description: 'AI 시대에 당신의 생존 지수를 진단하고 맞춤형 액션 플랜을 받아보세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
