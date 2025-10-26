import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="top" className="grid gap-10 rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-xl shadow-primary-100/50 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/70 bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-700">
          #사용자 경험 #편리함 #소통 중심
        </span>
        <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          사용자의 실시간 의사결정을 돕는 데이터 대시보드를 설계하는 프론트엔드 개발자 최지안입니다.
        </h1>
        <p className="max-w-xl text-base text-slate-600">
          통신/에너지 영역의 복잡한 데이터를 이해하기 쉬운 사용자 경험으로 바꾸고, 현장의 피드백을 인터랙션으로 검증하며 제품의 지속적인 개선을 이끌어왔습니다.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "Next.js & TypeScript 기반 설계",
            "실시간 데이터 시각화",
            "협업을 위한 디자인 시스템"
          ].map((item) => (
            <span key={item} className="rounded-full border border-primary-200 bg-white px-4 py-2 text-primary-600">
              {item}
            </span>
          ))}
        </div>
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-200/60 transition hover:bg-primary-500"
        >
          프로젝트 살펴보기 <ArrowDownIcon className="h-4 w-4" />
        </a>
      </div>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-primary-500/10 via-accent/10 to-primary-700/10 p-6">
          <div className="space-y-6 text-sm text-slate-600">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">주요 성과</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                운영 대시보드 UX 개선으로 모니터링 시간 35% 단축, KPI 대응 속도 25% 향상
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                "실사용자 데이터 기반의 문제 정의",
                "리얼타임 그래프/차트 퍼포먼스 최적화",
                "현장과의 소통을 위한 문서 & 시연 주도"
              ].map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-600">•</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-4 text-xs text-slate-500 shadow-inner">
              <p className="font-semibold text-primary-600">현재 관심 키워드</p>
              <p className="mt-1">O-RAN 관제, 실시간 분석 UX, 에너지 최적화 서비스, 디자인 시스템 운영</p>
            </div>
          </div>
          <Image
            src="/images/hero/profile-bubble.svg"
            alt="색상 원형 배경"
            width={320}
            height={320}
            className="pointer-events-none absolute -bottom-16 -right-10 opacity-70"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
