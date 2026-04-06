"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const activities = [
  {
    num: "01",
    emoji: "🍱",
    title: "축제 간식 부스 최적화",
    problem: "예산 10만원 안에서 수익을 최대화하는 메뉴 조합은?",
    tags: ["선형계획법", "Excel Solver"],
  },
  {
    num: "02",
    emoji: "📦",
    title: "구호물품 배분 계획",
    problem: "한정된 물품을 여러 지역에 공정하고 효율적으로 배분하려면?",
    tags: ["자원 배분", "우선순위 최적화"],
  },
  {
    num: "03",
    emoji: "🚌",
    title: "셔틀버스 노선 최적화",
    problem: "3대의 버스로 가장 많은 학생이 편리하게 이용할 수 있는 노선은?",
    tags: ["스케줄링", "Gurobi"],
  },
];

export default function Activities() {
  const ref = useScrollReveal();

  return (
    <section id="activities" className="py-24 px-6 border-t border-white/6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-xs font-bold text-[#5AAAD4] tracking-widest uppercase mb-5">Activities</p>
        <h2 className="reveal text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
          실제 문제, 직접 풀기
        </h2>
        <p className="reveal reveal-delay-1 text-white/35 text-base mb-14 max-w-lg">
          멘토의 안내 아래 조별로 최적화 문제를 수리적으로 모델링하고, 소프트웨어로 해를 구합니다.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {activities.map((a, i) => (
            <div key={a.num}
              className={`reveal reveal-delay-${i + 1} p-7 rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 hover:border-white/12 transition-all duration-200 group`}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl">{a.emoji}</span>
                <span className="text-xs font-black text-white/15 tracking-widest">{a.num}</span>
              </div>
              <h3 className="font-bold text-white text-base mb-3 leading-snug">{a.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-5">{a.problem}</p>
              <div className="flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="text-xs text-white/30 border border-white/8 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
