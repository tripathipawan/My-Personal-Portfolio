import { services } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

function ServiceMarqueeCard({ service, index }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between p-6"
      style={{
        width: "clamp(240px, 24vw, 320px)",
        aspectRatio: "5 / 6",
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: "1px solid var(--border)",
        boxShadow: "var(--neu-out)",
      }}
    >
      {/* top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}22)` }}
        aria-hidden
      />
      {/* glow blob */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: service.color, filter: "blur(45px)", opacity: 0.08 }}
        aria-hidden
      />
      {/* watermark number */}
      <div
        className="absolute bottom-4 right-5 font-black select-none pointer-events-none"
        style={{ fontFamily: "var(--mono)", fontSize: "2.6rem", lineHeight: 1, color: service.color, opacity: 0.07 }}
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${service.color}18`, border: `1px solid ${service.color}35` }}
          >
            {service.icon}
          </div>

          {service.available && (
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
              style={{ background: "rgba(16, 217, 160, 0.1)", border: "1px solid rgba(16, 217, 160, 0.3)", color: "var(--green)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)", animation: "blink 2s ease infinite" }} />
              Available
            </span>
          )}
        </div>

        <h3 className="text-base font-black mb-2 leading-tight" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
          {service.title}
        </h3>
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--text2)" }}>
          {service.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10 mt-4">
        {service.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${service.color}12`, border: `1px solid ${service.color}30`, color: service.color }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const loopServices = [...services, ...services];

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: "var(--bg0)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase hidden sm:block"
        aria-hidden
        style={{ fontSize: "6rem", letterSpacing: "-2px", color: "var(--text1)", opacity: 0.05, fontFamily: "var(--font)" }}
      >
        SERVICES
      </div>

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="What I Offer"
          title={<>My <span className="g-text">Services</span></>}
          subtitle="From pixel-perfect UIs to AI-powered web apps — I build digital experiences that stand out and perform. Hover to pause and take a closer look."
        />

        <Reveal>
          <div
            className="w-full max-w-[1200px] mx-auto overflow-hidden py-5"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex gap-5 sm:gap-7">
              {loopServices.map((service, i) => (
                <ServiceMarqueeCard key={`${service.id}-${i}`} service={service} index={i % services.length} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}