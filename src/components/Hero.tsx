"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(100,15,30,0.25) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Date badge */}
        <div className="fade-up mb-10" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <span className="inline-flex items-center gap-2 text-sm text-white/40 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D63050]" />
            2026년 5월 10일 (일) · 고려대학교
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up mb-6" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <span className="block text-white font-black leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            산업경영공학,
          </span>
          <span className="block gradient-text font-black leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            직접 경험하세요.
          </span>
        </h1>

        {/* Sub */}
        <p className="fade-up text-white/40 text-lg max-w-xl leading-relaxed mb-12"
          style={{ animationDelay: "0.35s", opacity: 0 }}>
          최적화·데이터·시스템 설계를 체험하는 하루짜리 캠프.
          고등학생을 위한 무료 진로 탐색 프로그램입니다.
        </p>

        {/* CTAs */}
        <div className="fade-up flex flex-col sm:flex-row gap-3 mb-20"
          style={{ animationDelay: "0.45s", opacity: 0 }}>
          <button onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-bold text-white text-base btn-primary hover:opacity-90 active:scale-95 transition-all cursor-pointer">
            지금 신청하기 →
          </button>
          <button onClick={() => document.querySelector("#program")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-semibold text-white/50 hover:text-white text-base border border-white/10 hover:border-white/20 hover:bg-white/4 transition-all cursor-pointer">
            프로그램 보기
          </button>
        </div>

        {/* Stats */}
        <div className="fade-up flex flex-wrap gap-8 text-sm" style={{ animationDelay: "0.55s", opacity: 0 }}>
          {[
            { value: "5시간", label: "몰입 체험" },
            { value: "3가지", label: "실습 활동" },
            { value: "무료", label: "참가비" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-black text-white text-xl mb-0.5">{s.value}</div>
              <div className="text-white/30 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0C0C10] to-transparent pointer-events-none" />
    </section>
  );
}
