# Jian Choi Portfolio (Next.js)

스마트폰, 태블릿, 데스크탑 환경을 모두 고려한 반응형 프론트엔드 포트폴리오 사이트입니다. Next.js (App Router)와 TypeScript, Tailwind CSS, module.scss를 조합하여 구성했습니다.

## 주요 특징

- **반응형 레이아웃**: 3단계 브레이크포인트 기반으로 Hero, 프로젝트, 역량, 경력 섹션이 레이아웃을 전환합니다.
- **데이터 드리븐 컴포넌트**: 프로젝트 정보는 `src/data/projects.ts`에서 정의되어 카드 컴포넌트로 매핑됩니다.
- **Tailwind + module.scss**: 글로벌 스타일과 유틸리티는 Tailwind로, 섬세한 효과는 SCSS 모듈로 관리합니다.
- **Framer Motion 인터랙션**: 상단 네비게이션의 진행 바와 Hero 섹션에 부드러운 애니메이션을 적용했습니다.

## 사용 방법

```bash
cd portfolio
npm install
npm run dev
```

포트폴리오는 `http://localhost:3000`에서 확인할 수 있습니다.
