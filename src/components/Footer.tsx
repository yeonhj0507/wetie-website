import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="WeTIE" width={28} height={28} className="object-contain opacity-70" />
          <div>
            <div className="font-bold text-white/60 text-sm">WeTIE</div>
            <div className="text-xs text-white/20">고려대학교 산업경영공학부</div>
          </div>
        </div>

        <div className="text-xs text-white/20 space-y-1">
          <div>2026년 5월 10일 (일) 13:00–18:00 · 고려대학교</div>
          <div>문의: wetie.ku@gmail.com</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/4 text-xs text-white/15">
        © 2026 WeTIE — 고려대학교 산업경영공학부 학술동아리
      </div>
    </footer>
  );
}
