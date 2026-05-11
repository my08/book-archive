import { Inter, Outfit } from "next/font/google"; // 폰트 추가
import "./globals.css";

// 제미나이 느낌의 폰트 설정
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}