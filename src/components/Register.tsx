"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Form = {
  name: string; school: string; grade: string;
  phone: string; email: string; motivation: string; agree: boolean;
};

const empty: Form = { name: "", school: "", grade: "", phone: "", email: "", motivation: "", agree: false };

export default function Register() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useScrollReveal();

  const set = (k: keyof Form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요";
    if (!form.school.trim()) e.school = "학교명을 입력해 주세요";
    if (!form.grade) e.grade = "학년을 선택해 주세요";
    if (!form.phone.trim()) e.phone = "연락처를 입력해 주세요";
    if (!form.email.trim()) e.email = "이메일을 입력해 주세요";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일을 입력해 주세요";
    if (!form.agree) e.agree = "동의가 필요합니다";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (k: keyof Form) =>
    `w-full bg-white/3 border rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 transition-colors ${
      errors[k] ? "border-[#D63050]/50" : "border-white/8 hover:border-white/15"
    }`;

  if (status === "success") {
    return (
      <section id="register" className="py-24 px-6 border-t border-white/6" ref={ref}>
        <div className="max-w-md mx-auto text-center py-16">
          <div className="text-5xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-3">신청 완료!</h2>
          <p className="text-white/40 text-sm leading-relaxed">
            입력하신 이메일로 확인 메일을 발송했습니다.<br />
            5월 10일 (일) 13:00, 고려대학교에서 만나요.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 px-6 border-t border-white/6" ref={ref}>
      <div className="max-w-xl mx-auto">
        <p className="reveal text-xs font-bold text-[#D63050] tracking-widest uppercase mb-5">Apply</p>
        <h2 className="reveal text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
          참가 신청
        </h2>
        <p className="reveal reveal-delay-1 text-white/35 text-sm mb-5">
          성북구·동대문구·강북구 인근 고등학교 재학생이라면 누구나 신청 가능합니다. 참가비 무료.
        </p>
        <div className="reveal reveal-delay-2 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[#D63050]/25 bg-[#D63050]/8 mb-10">
          <span className="text-[#D63050] text-base">⚠</span>
          <p className="text-[#D63050]/80 text-sm">
            선착순 <strong className="text-[#D63050]">50명</strong> 정원으로 조기 마감될 수 있습니다.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="reveal reveal-delay-2 flex flex-col gap-4">
          {/* 이름 + 학년 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/30 mb-2">이름 <span className="text-[#D63050]">*</span></label>
              <input type="text" placeholder="홍길동" value={form.name}
                onChange={(e) => set("name", e.target.value)} className={inputCls("name")} />
              {errors.name && <p className="text-[#D63050] text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs text-white/30 mb-2">학년 <span className="text-[#D63050]">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {["1학년", "2학년", "3학년"].map((g) => (
                  <button key={g} type="button" onClick={() => set("grade", g)}
                    className={`py-3.5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      form.grade === g
                        ? "bg-[#8B1A2A]/50 border-[#D63050]/60 text-white"
                        : "bg-white/3 border-white/8 text-white/40 hover:border-white/20 hover:text-white/70"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
              {errors.grade && <p className="text-[#D63050] text-xs mt-1">{errors.grade}</p>}
            </div>
          </div>

          {/* 학교 */}
          <div>
            <label className="block text-xs text-white/30 mb-2">학교 <span className="text-[#D63050]">*</span></label>
            <input type="text" placeholder="○○고등학교" value={form.school}
              onChange={(e) => set("school", e.target.value)} className={inputCls("school")} />
            {errors.school && <p className="text-[#D63050] text-xs mt-1">{errors.school}</p>}
          </div>

          {/* 연락처 + 이메일 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/30 mb-2">연락처 <span className="text-[#D63050]">*</span></label>
              <input type="tel" placeholder="010-0000-0000" value={form.phone}
                onChange={(e) => set("phone", e.target.value)} className={inputCls("phone")} />
              {errors.phone && <p className="text-[#D63050] text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-xs text-white/30 mb-2">이메일 <span className="text-[#D63050]">*</span></label>
              <input type="email" placeholder="example@email.com" value={form.email}
                onChange={(e) => set("email", e.target.value)} className={inputCls("email")} />
              {errors.email && <p className="text-[#D63050] text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* 참가 동기 */}
          <div>
            <label className="block text-xs text-white/30 mb-2">참가 동기 <span className="text-white/15">(선택)</span></label>
            <textarea rows={3} placeholder="산업경영공학에 관심을 갖게 된 계기나 참가 이유를 자유롭게 작성해 주세요."
              value={form.motivation} onChange={(e) => set("motivation", e.target.value)}
              className={inputCls("motivation") + " resize-none"} />
          </div>

          {/* 개인정보 동의 */}
          <label className="flex items-start gap-3 cursor-pointer mt-1">
            <div className="relative mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} className="sr-only" />
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                form.agree ? "bg-[#8B1A2A] border-[#D63050]" : "border-white/15"
              }`}>
                {form.agree && (
                  <svg viewBox="0 0 10 8" className="w-3 h-3">
                    <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-white/30 leading-relaxed">
              개인정보(이름, 학교, 연락처, 이메일)를 캠프 운영 목적으로 수집·이용하는 것에 동의합니다.
              <span className="text-[#D63050] ml-1">*</span>
            </span>
          </label>
          {errors.agree && <p className="text-[#D63050] text-xs -mt-2">{errors.agree}</p>}

          <button type="submit" disabled={status === "loading"}
            className="w-full py-4 rounded-2xl font-bold text-white btn-primary mt-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {status === "loading" ? "처리 중..." : "신청하기 →"}
          </button>

          {status === "error" && (
            <p className="text-center text-[#D63050] text-sm">오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
          )}
        </form>
      </div>
    </section>
  );
}
