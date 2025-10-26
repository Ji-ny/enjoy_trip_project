import { SectionHeader } from "./SectionHeader";

const skills = [
  {
    title: "Frontend Engineering",
    items: [
      "Next.js, React, TypeScript 기반의 모듈 설계",
      "TanStack Query, Zustand, Recoil 상태관리 최적화",
      "고성능 데이터 테이블 & 차트 컴포넌트 설계"
    ]
  },
  {
    title: "Design & Communication",
    items: [
      "Figma를 활용한 디자인 시스템 & 문서화",
      "사용자 여정 기반 와이어프레임 및 프로토타이핑",
      "연구원/운영팀 대상 릴리즈 리뷰 및 교육 세션 진행"
    ]
  },
  {
    title: "Data Experience",
    items: [
      "실시간 로그/시계열 데이터 시각화",
      "API 신뢰성 확보를 위한 예외 처리 & 모니터링",
      "데이터 품질 진단을 위한 툴링 제작"
    ]
  }
];

export function SkillSection() {
  return (
    <section id="skills" className="space-y-8">
      <SectionHeader
        eyebrow="핵심 역량"
        title="사용자 경험과 데이터 정확도를 동시에 잡는 기술"
        description="프로덕트 팀과 연구 현장 사이에서 커뮤니케이션을 조율하며, 데이터 기반 기능을 안정적으로 제공하기 위한 역량을 다듬어왔습니다."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.title} className="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-primary-100/30">
            <h3 className="font-display text-lg font-semibold text-primary-700">{skill.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {skill.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary-300" />
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
