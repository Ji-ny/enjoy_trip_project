import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Jian Choi · Frontend Engineer",
  description: "스마트한 통신/에너지 대시보드를 설계한 프론트엔드 개발자 최지안의 포트폴리오",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Developer",
    "Portfolio"
  ]
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={clsx(
          "min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 text-slate-900",
          "antialiased"
        )}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-4 pb-12 pt-8 sm:px-8 lg:px-12">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
