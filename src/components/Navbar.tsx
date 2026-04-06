"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "프로그램", href: "#program" },
  { label: "일정", href: "#schedule" },
  { label: "신청", href: "#register" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0C0C10]/90 backdrop-blur-md border-b border-white/6 py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 cursor-pointer">
            <Image src="/logo.png" alt="WeTIE" width={32} height={32} className="object-contain" />
            <span className="font-bold text-white/90 text-base">WeTIE</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => go(item.href)}
                className="px-4 py-2 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => go("#register")}
              className="hidden md:block px-5 py-2.5 rounded-full text-sm font-bold text-white btn-primary cursor-pointer">
              참가 신청
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center cursor-pointer">
              <span className={`block h-px w-5 bg-white/60 transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block h-px w-5 bg-white/60 transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#111116] border-l border-white/6 flex flex-col pt-20 pb-8 px-5 gap-1">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => go(item.href)}
                className="text-left px-4 py-3 text-base text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                {item.label}
              </button>
            ))}
            <div className="mt-4">
              <button onClick={() => go("#register")}
                className="w-full py-3.5 rounded-2xl font-bold text-white btn-primary cursor-pointer text-sm">
                참가 신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
