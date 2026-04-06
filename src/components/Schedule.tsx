"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const items = [
  { time: "13:00", title: "참가자 등록 및 집합" },
  { time: "13:30", title: "오리엔테이션 & 환영사" },
  { time: "14:00", title: "전공 소개 강연", accent: true },
  { time: "14:40", title: "조별 최적화 실습", highlight: true },
  { time: "16:40", title: "진로 & 입학 안내", accent: true },
  { time: "17:40", title: "자유 멘토링" },
  { time: "17:50", title: "마무리 & 기념촬영" },
];

export default function Schedule() {
  const ref = useScrollReveal();

  return (
    <section id="schedule" className="py-24 px-6 border-t border-white/6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-xs font-bold text-[#D63050] tracking-widest uppercase mb-5">Schedule</p>
        <h2 className="reveal text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
          5월 10일 (일)
        </h2>
        <p className="reveal reveal-delay-1 text-white/30 text-sm mb-14">
          13:00 – 18:00 · 고려대학교 (세부 장소 추후 공지)
        </p>

        <div className="flex flex-col divide-y divide-white/5">
          {items.map((item, i) => (
            <div key={item.time}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex items-center gap-8 py-5`}>
              <span className="font-mono text-sm text-white/25 w-14 flex-shrink-0">{item.time}</span>
              <span className={`text-base font-semibold ${
                item.highlight
                  ? "gradient-text"
                  : item.accent
                  ? "text-white/80"
                  : "text-white/45"
              }`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <p className="reveal text-white/20 text-xs mt-8">
          ※ 세부 시간은 운영 상황에 따라 조정될 수 있습니다
        </p>
      </div>
    </section>
  );
}
