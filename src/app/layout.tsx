import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 WeTIE 산업경영공학 캠프",
  description: "고등학생을 위한 산업경영공학 진로 탐색 체험 캠프 — 최적화 문제 실습, 전공 소개, 멘토링까지. 2026년 5월 10일, 고려대학교.",
  keywords: ["산업경영공학", "캠프", "고등학생", "진로탐색", "WeTIE", "고려대학교"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "2026 WeTIE 산업경영공학 캠프",
    description: "최적화부터 데이터까지 — 산업경영공학의 세계를 직접 체험하세요",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
