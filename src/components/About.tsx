"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6 border-t border-white/6" ref={ref}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="reveal text-xs font-bold text-[#D63050] tracking-widest uppercase mb-5">About WeTIE</p>
          <h2 className="reveal text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-6">
            공학으로<br />세상의 문제를 풉니다.
          </h2>
          <p className="reveal reveal-delay-1 text-white/40 text-base leading-relaxed mb-4">
            WeTIE는 고려대학교 산업경영공학부 학생 단체입니다. 산업경영공학의 가치를 더 많은 사람과 나누기 위해 활동합니다.
          </p>
          <p className="reveal reveal-delay-2 text-white/40 text-base leading-relaxed">
            산업경영공학은 수학·데이터·경영·시스템 설계를 결합해 현실의 복잡한 문제를 해결하는 학문입니다. 이번 캠프에서 그 핵심을 직접 체험해 보세요.
          </p>
        </div>

        <div className="reveal reveal-delay-2 flex items-center justify-center">
          <div className="relative w-32 h-32 opacity-80">
            <Image src="/logo.png" alt="WeTIE" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
