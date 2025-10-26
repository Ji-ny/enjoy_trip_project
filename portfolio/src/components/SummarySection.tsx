import { SectionHeader } from "./SectionHeader";

const summaries = [
  {
    title: "프로젝트 요약",
    items: [
      "O-RAN RICS 관제 대시보드 1.0/2.0",
      "에너지 절감 rApp 시각화 대시보드",
      "울산 하늘공원 장례식장 반응형 웹"
    ]
  },
  {
    title: "핵심 역할",
    items: [
      "데이터 시각화/UX 리디자인 주도",
      "Mock API/테스트 환경 구성",
      "관계자 커뮤니케이션 및 교육"
    ]
  },
  {
    title: "성과",
    items: [
      "모니터링 시간 35% 단축",
      "오류 대응 속도 25% 향상",
      "모바일 전환율 33% 증가"
    ]
  }
];

export function SummarySection() {
  return (
    <section aria-labelledby="summary" className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-primary-100/30">
      <SectionHeader eyebrow="한눈에 보는 요약" title="프로젝트 맥락과 성과" />
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {summaries.map((summary) => (
          <div key={summary.title} className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-primary-50/40 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">{summary.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {summary.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
