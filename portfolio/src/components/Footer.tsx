import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer id="contact" className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-primary-100/30">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-semibold text-primary-700">사용자의 소소한 순간까지 고민하는 프론트엔드 개발자</p>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            실사용자 기반 데이터 대시보드와 반응형 서비스에 강점을 가지며, 문제 탐색부터 인터랙션 구현까지 전 과정을 주도적으로 이끈 경험이 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-600">
          <a href="mailto:moc24@naver.com" className="flex items-center gap-2 hover:text-primary-600">
            <EnvelopeIcon className="h-5 w-5" /> moc24@naver.com
          </a>
          <a href="tel:01040963487" className="flex items-center gap-2 hover:text-primary-600">
            <PhoneIcon className="h-5 w-5" /> 010-4096-3487
          </a>
        </div>
      </div>
      <p className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} Jian Choi. All rights reserved.</p>
    </footer>
  );
}
