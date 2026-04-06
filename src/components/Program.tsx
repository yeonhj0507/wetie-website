"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const programs = [
  { num: "01", title: "오리엔테이션", desc: "WeTIE 소개, 당일 일정 및 유의사항 안내" },
  { num: "02", title: "교수님 초청 강연", desc: "산업경영공학의 학문적 특성과 커리어 패스", accent: true },
  { num: "03", title: "최적화 실습", desc: "조별로 실제 문제를 Excel Solver / Gurobi로 직접 풀고 발표", highlight: true },
  { num: "04", title: "입학 · 진로 안내", desc: "입학 전형, 대학생활, 커리큘럼, 취업 진로 안내", accent: true },
  { num: "05", title: "선배 멘토링", desc: "WeTIE 재학생 멘토와 자유 질의응답" },
];

export default function Program() {
  const ref = useScrollReveal();

  return (
    <section id="program" className="py-24 px-6 border-t border-white/6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-xs font-bold text-[#D63050] tracking-widest uppercase mb-5">Program</p>
        <h2 className="reveal text-3xl md:text-4xl font-black text-white tracking-tight mb-14">
          5가지 프로그램
        </h2>

        <div className="flex flex-col divide-y divide-white/6">
          {programs.map((p, i) => (
            <div key={p.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex items-start gap-6 py-7 group`}>
              <span className="text-xs font-black text-white/20 tracking-widest mt-1 w-8 flex-shrink-0">{p.num}</span>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 transition-colors ${
                  p.highlight ? "gradient-text" : "text-white group-hover:text-white/80"
                }`}>
                  {p.title}
                  {p.highlight && <span className="ml-2 text-xs font-semibold text-[#5AAAD4] normal-case tracking-normal" style={{ WebkitTextFillColor: "initial" }}>핵심</span>}
                </h3>
                <p className="text-white/35 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
