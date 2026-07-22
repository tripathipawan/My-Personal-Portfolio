import { useRef } from "react";
import { useInViewOnce } from "../../hooks/index";

export default function SectionHeader({ eyebrow, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);

  return (
    <div ref={ref} className="mb-14">
      <div
        className={`flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase mb-4 rv${inView ? " in" : ""}`}
        style={{ color: "var(--accent-h)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--accent)" }} />
        {eyebrow}
      </div>

      <div className="overflow-hidden">
        <h2
          className={`section-title-rv${inView ? " in" : ""} font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]`}
          style={{ fontFamily: "var(--font)", color: "var(--text1)" }}
        >
          {title}
        </h2>
      </div>

      <p
        className={`rv${inView ? " in" : ""} mt-4 text-sm leading-relaxed max-w-lg`}
        style={{ color: "var(--text2)", "--rv-d": "150ms" }}
      >
        {subtitle}
      </p>
    </div>
  );
}