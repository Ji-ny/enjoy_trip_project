export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  organization: string;
  stacks: string[];
  roles: string[];
  achievements: string[];
  problems: string[];
  solutions: string[];
  images: {
    title: string;
    alt: string;
    src: string;
  }[];
  highlight?: string;
};

export const projects: Project[] = [
  {
    id: "oran-dashboard-2",
    title: "O-RAN RICS 관리 대시보드 2.0",
    subtitle: "ETRI 내 현장 운영팀이 실시간 모니터링 가능한 통합 대시보드",
    period: "2024.09.12 - 2024.12.31 (4개월)",
    organization: "한국전자통신연구원(ETRI) 지능형 스웜랩 연구실",
    stacks: [
      "React",
      "TypeScript",
      "SCSS",
      "Axios",
      "TanStack Query",
      "Zustand",
      "Figma"
    ],
    roles: [
      "사용자 친화형 관제 UI/UX 개발",
      "실시간 라인차트/지표 대시보드 구현",
      "데이터 품질 검증 로직 & 예외 처리 설계",
      "큐레이션형 UX 마이크로 인터랙션 설계"
    ],
    achievements: [
      "실서비스 적용과 동시에 현장 운영팀의 모니터링 시간을 35% 단축",
      "데이터 품질 이슈를 자동 감지하여 운영팀 알림 기능 제공",
      "하나의 대시보드에서 다중 관제 시나리오를 지원"
    ],
    problems: [
      "이전 버전의 낮은 시인성과 이해하기 어려운 데이터 구조",
      "다양한 사용자 유형을 위한 가변형 레이아웃 요구",
      "대규모 시계열 데이터 렌더링에 따른 성능 저하"
    ],
    solutions: [
      "카드 기반 레이아웃과 컬러 시스템 재정의로 UI 가독성 향상",
      "Flex 기반 반응형 템플릿과 사용자별 위젯 프리셋 제공",
      "가상 스크롤과 청크 로딩으로 렌더링 성능 40% 개선"
    ],
    images: [
      { title: "Dashboard", alt: "대시보드 전반", src: "/images/projects/oran-dashboard-2/dashboard.svg" },
      { title: "Diagnostic Monitor", alt: "진단 모니터", src: "/images/projects/oran-dashboard-2/diagnostic.svg" },
      { title: "Performance", alt: "성능 지표", src: "/images/projects/oran-dashboard-2/performance.svg" }
    ],
    highlight: "실사용자 피드백 기반으로 하루 3회 모니터링 플로우를 최적화"
  },
  {
    id: "oran-dashboard-1",
    title: "O-RAN RICS 관리 대시보드 1.0",
    subtitle: "O-RAN RIC 구성 요소를 차트/로그/형상으로 실시간 모니터링",
    period: "2024.07.01 - 2024.08.31 (2개월)",
    organization: "한국전자통신연구원(ETRI) 지능형 스웜랩 연구실",
    stacks: ["React", "TypeScript", "SCSS", "TanStack Query", "Zustand", "Figma"],
    roles: [
      "TanStack-query 기반 리얼타임 데이터 동기화",
      "모듈화된 API 클라이언트와 전역 스토어 설계",
      "차트/테이블/타임라인 패턴 라이브러리 개발"
    ],
    achievements: [
      "Mock API를 활용한 선행 개발로 실데이터 연동 기간 30% 단축",
      "데이터 품질/베이스라인 검증 자동화",
      "오류 대응 시간 25% 단축"
    ],
    problems: [
      "이기종 장비에서 오는 API 지연",
      "운영자가 필요한 지표를 즉시 찾기 어려움",
      "화면 밀집도와 UX 혼잡도 증가"
    ],
    solutions: [
      "요청 큐 기반 API 재시도와 지연 지표 표시",
      "지표 검색/태깅 및 즐겨찾기 기능 제공",
      "UI 정보구조 리디자인 및 스켈레톤 로딩 적용"
    ],
    images: [
      { title: "Dashboard", alt: "대시보드", src: "/images/projects/oran-dashboard-1/dashboard.svg" },
      { title: "Non-RT RIC", alt: "Non-RT RIC 화면", src: "/images/projects/oran-dashboard-1/non-rt.svg" },
      { title: "Near-RT RIC", alt: "Near-RT RIC 화면", src: "/images/projects/oran-dashboard-1/near-rt.svg" }
    ]
  },
  {
    id: "energy-rapp",
    title: "오픈랜 시스템에서 에너지 절감 rApp 시각화 대시보드",
    subtitle: "에너지 절감을 위한 rApp KPI 모니터링",
    period: "2024.01.01 - 2024.08.31 (8개월)",
    organization: "한국전자통신연구원(ETRI) 지능형 스웜랩 연구실",
    stacks: ["React", "TypeScript", "Recharts", "React-Query", "Styled-components"],
    roles: [
      "실시간 KPI 카드/그래프 UI 개발",
      "에너지 절감 시나리오 기반 UX 설계",
      "다중 레이아웃 반응형 차트 구현"
    ],
    achievements: [
      "에너지 절감 KPI 시뮬레이션 시나리오 시각화",
      "시계열 데이터 가시화 정확도 향상",
      "내부 PoC를 통해 실제 장비 연동까지 확장"
    ],
    problems: [
      "실시간 데이터 처리 중 끊김 현상",
      "복잡한 차트 구성과 반응형 이슈",
      "시뮬레이션 결과의 비교 가시성 부족"
    ],
    solutions: [
      "웹소켓 구독과 데이터 스로틀링으로 안정화",
      "반응형 차트 템플릿 및 범례 가이드 제공",
      "시나리오별 비교 카드 및 강조 색 체계 도입"
    ],
    images: [
      { title: "Energy Monitor", alt: "에너지 모니터", src: "/images/projects/energy-rapp/monitor.svg" },
      { title: "Site Overview", alt: "사이트 전체", src: "/images/projects/energy-rapp/overview.svg" }
    ]
  },
  {
    id: "ulsan-memorial",
    title: "울산 하늘공원 장례식장 반응형 홈페이지 외주 개발",
    subtitle: "장례식장 예약/안내 반응형 웹",
    period: "2024.07.30 - 2025.01.07 (5개월)",
    organization: "울산 하늘공원 장례식장",
    stacks: ["TypeScript", "React", "Recoil", "SCSS", "Styled-components", "Figma"],
    roles: [
      "4단계 캐러셀 기반 시설 소개 페이지 개발",
      "장례 일정/부고 알림 기능 개발",
      "모바일/데스크탑 전용 UI 가이드 제작"
    ],
    achievements: [
      "시설 예약 문의 전환율 33% 증가",
      "모바일 방문자의 페이지 이탈률 28% 감소",
      "유가족 케어 기능 통한 상담 만족도 향상"
    ],
    problems: [
      "장례 절차 정보 구조의 복잡성",
      "모바일 사용성 문제",
      "운영팀의 콘텐츠 업데이트 요구"
    ],
    solutions: [
      "사용자 여정 기반 네비게이션 재구성",
      "모바일 우선 반응형 그리드 설계",
      "CMS 연동 가능한 모듈식 컴포넌트 구축"
    ],
    images: [
      { title: "Intro Page", alt: "인트로 페이지", src: "/images/projects/ulsan-memorial/intro.svg" },
      { title: "Facility", alt: "시설 안내", src: "/images/projects/ulsan-memorial/facility.svg" }
    ]
  }
];
