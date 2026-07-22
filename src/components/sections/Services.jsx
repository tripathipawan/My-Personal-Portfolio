import { useRef, useState } from "react";
import { services } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

function HeroCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden col-span-1 md:col-span-2"
      style={{
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: `1px solid ${hovered ? service.color + "55" : "var(--border)"}`,
        boxShadow: "var(--neu-out)",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}44)` }} />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: service.color, filter: "blur(60px)", opacity: hovered ? 0.12 : 0.06, transition: "opacity 0.4s" }}
        aria-hidden
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 relative z-10">
        <div
          className="hidden sm:flex text-[80px] font-black leading-none select-none flex-shrink-0"
          style={{ fontFamily: "var(--mono)", color: service.color, opacity: 0.08 }}
          aria-hidden
        >
          01
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300"
          style={{
            background: `${service.color}18`,
            border: `1px solid ${service.color}35`,
            boxShadow: hovered ? `0 0 24px ${service.color}30` : "none",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {service.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2" style={{ color: service.color }}>
            Primary Service
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-2 leading-tight" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text2)" }}>
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${service.color}12`, border: `1px solid ${service.color}30`, color: service.color }}
              >
                {tag}
              </span>
            ))}
            {service.available && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ml-auto"
                style={{ background: "rgba(16, 217, 160, 0.1)", border: "1px solid rgba(16, 217, 160, 0.3)", color: "var(--green)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)", animation: "blink 2s ease infinite" }} />
                Available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-5 overflow-hidden flex flex-col gap-3"
      style={{
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: `1px solid ${hovered ? service.color + "55" : "var(--border)"}`,
        boxShadow: "var(--neu-out-sm)",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: service.color, opacity: 0.7 }} />
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: service.color, filter: "blur(32px)", opacity: hovered ? 0.1 : 0.04, transition: "opacity 0.35s" }}
        aria-hidden
      />
      <div
        className="absolute bottom-3 right-4 font-black select-none pointer-events-none"
        style={{ fontFamily: "var(--mono)", fontSize: "2.2rem", lineHeight: 1, color: service.color, opacity: 0.06 }}
        aria-hidden
      >
        {String(index + 2).padStart(2, "0")}
      </div>

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative z-10 transition-transform duration-300"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30`, transform: hovered ? "scale(1.1)" : "scale(1)" }}
      >
        {service.icon}
      </div>

      <div className="relative z-10 flex-1">
        <div className="w-8 h-[2px] rounded-full mb-2" style={{ background: service.color }} />
        <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
          {service.title}
        </h3>
        <p className="text-[11px] leading-[1.6]" style={{ color: "var(--text2)" }}>
          {service.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10">
        {service.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${service.color}10`, border: `1px solid ${service.color}25`, color: service.color }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { label: "Services", value: `${services.length}` },
    { label: "Projects Delivered", value: "75+" },
    { label: "Open to Work", value: "Yes ✓" },
  ];

  return (
    <Reveal className="mt-6 grid grid-cols-3 gap-3" delay={300}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center py-4 px-2 rounded-2xl"
          style={{ background: "linear-gradient(145deg, var(--bg2), var(--bg3))", border: "1px solid var(--border)", boxShadow: "var(--neu-out-sm)" }}
        >
          <span className="text-xl sm:text-2xl font-black g-text" style={{ fontFamily: "var(--font)" }}>
            {s.value}
          </span>
          <span className="text-[10px] sm:text-xs font-medium mt-1 text-center" style={{ color: "var(--text2)" }}>
            {s.label}
          </span>
        </div>
      ))}
    </Reveal>
  );
}

export default function Services() {
  const gridRef = useRef(null);
  const [heroService, ...miniServices] = services;

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: "var(--bg0)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="What I Offer"
          title={<>My <span className="g-text">Services</span></>}
          subtitle="From pixel-perfect UIs to AI-powered web apps — I build digital experiences that stand out and perform."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Reveal className="col-span-1 md:col-span-2">
            <HeroCard service={heroService} />
          </Reveal>
          {miniServices.map((service, i) => (
            <Reveal key={service.id} delay={i * 80}>
              <MiniCard service={service} index={i} />
            </Reveal>
          ))}
        </div>

        <StatsRow />
      </div>
    </section>
  );
}