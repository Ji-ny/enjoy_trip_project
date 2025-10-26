import { SectionHeader } from "./SectionHeader";

const experiences = [
  {
    title: "ETRI 지능형 스웜랩 연구실",
    role: "연구원 (프론트엔드)",
    period: "2024.01 - 현재",
    details: [
      "O-RAN RICS 관제 대시보드 1.0/2.0 프론트엔드 총괄",
      "실시간 데이터 Mocking 환경 및 배포 자동화 설계",
      "연구 결과 발표 및 국제 학회 데모 세션 참여"
    ]
  },
  {
    title: "울산 하늘공원 장례식장",
    role: "프리랜서 프론트엔드",
    period: "2024.07 - 2025.01",
    details: [
      "시설 안내/예약 반응형 웹 구축",
      "운영팀 요구사항 기반 CMS 구조 제안",
      "상담 전환율 분석을 위한 데이터 수집 플로우 설계"
    ]
  }
];

export function CareerSection() {
  return (
    <section id="career" className="space-y-8">
      <SectionHeader
        eyebrow="경험"
        title="협업과 성장을 이끈 여정"
        description="연구 기관과 민간 프로젝트에서 사용자 중심의 제품 개선을 이끈 경험을 통해 다양한 도메인의 이해관계를 조율해왔습니다."
      />
      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.title} className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg shadow-primary-100/30">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">{experience.title}</h3>
                <p className="text-sm text-primary-600">{experience.role}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{experience.period}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {experience.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-400" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
