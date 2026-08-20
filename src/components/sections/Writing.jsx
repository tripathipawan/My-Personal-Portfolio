/* eslint-disable react-hooks/refs */
import { useRef, useCallback } from "react";
import { newsletter } from "../../data/index";
import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight, Users, Radio, Sparkles } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

const TAG_COLORS = ["#22d3ee", "#a78bfa", "#f59e0b", "#f472b6", "#34d399"];
const TICKER_TOPICS = [
  "AI AGENTS", "RAG", "CONTEXT ENGINEERING", "LLMS", "FRONTEND", "NEXT.JS",
  "PROMPT ENGINEERING", "VECTOR DB", "TYPESCRIPT", "SYSTEM DESIGN",
];

/* ── shared 3D tilt hook ── */
function useTilt(strength = 7) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);

  const onEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const onMove = useCallback(
    (e) => {
      if (rafRef.current) return;
      const rect = rectRef.current;
      if (!rect || !ref.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el || !rect) {
          rafRef.current = null;
          return;
        }
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = (x - rect.width / 2) / (rect.width / 2);
        const dy = (y - rect.height / 2) / (rect.height / 2);
        el.style.transform = `perspective(900px) rotateY(${dx * strength}deg) rotateX(${-dy * strength}deg) translateZ(2px)`;
        el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
        el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
        rafRef.current = null;
      });
    },
    [strength]
  );

  const onLeave = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);

  return { ref, onEnter, onMove, onLeave };
}

function FeaturedCard({ article }) {
  const tilt = useTilt(3);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={tilt.ref}
      onMouseEnter={tilt.onEnter}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="group no-underline relative flex flex-col justify-between overflow-hidden rounded-[22px] p-6 sm:p-8 border transition-shadow duration-300 [transform-style:preserve-3d] sm:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-0"
      style={{
        background: "linear-gradient(150deg, var(--bg2), var(--bg3))",
        borderColor: "var(--border)",
        boxShadow: "var(--neu-out)",
      }}
    >
      {/* rotating gradient border */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[22px] pointer-events-none z-[1] opacity-70 animate-[wrRotate_5s_linear_infinite]"
        style={{
          padding: "1.5px",
          background: "conic-gradient(from var(--wr-angle,0deg), transparent 0%, #22d3ee 8%, transparent 22%, transparent 100%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* cursor spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,.09), transparent 70%)" }}
      />

      <div className="relative z-10 flex items-center justify-between gap-3 flex-wrap mb-5">
        <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-extrabold px-3 py-1.5 rounded-full text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/30">
          <Sparkles size={11} aria-hidden="true" /> Latest Drop
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold"
          style={{ color: "var(--text3)", fontFamily: "var(--mono, monospace)" }}
        >
          <Radio size={11} aria-hidden="true" className="text-[#34d399] animate-[wrPulseIcn_1.8s_ease-in-out_infinite]" />
          {newsletter.subscribers} reading
        </span>
      </div>

      <h3
        className="relative z-10 font-black text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.18] mb-3"
        style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
      >
        {article.title}
      </h3>
      <p className="relative z-10 text-[0.87rem] leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--text2)" }}>
        {article.desc}
      </p>

      <div className="relative z-10 flex items-center justify-between gap-3 flex-wrap">
        <span
          className="inline-block text-[0.62rem] font-extrabold px-2.5 py-1 rounded-full border"
          style={{ color: "#22d3ee", borderColor: "#22d3ee55", background: "#22d3ee14" }}
        >
          {article.tag}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-extrabold text-[#22d3ee]">
          Read the breakdown <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

function ArticleCard({ article, index }) {
  const tilt = useTilt(9);
  const color = TAG_COLORS[(index + 1) % TAG_COLORS.length];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={tilt.ref}
      onMouseEnter={tilt.onEnter}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="group no-underline relative flex flex-col justify-between overflow-hidden rounded-[20px] p-5 pb-4 border transition-shadow duration-300 [transform-style:preserve-3d]"
      style={{
        background: "linear-gradient(150deg, var(--bg2), var(--bg3))",
        borderColor: "var(--border)",
        boxShadow: "var(--neu-out)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(200px circle at var(--mx,50%) var(--my,50%), ${color}29, transparent 70%)` }}
      />

      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-[0.66rem] font-bold" style={{ color: "var(--text3)", fontFamily: "var(--mono, monospace)" }}>
          {String(index + 2).padStart(2, "0")}
        </span>
        <span
          className="text-[0.62rem] font-extrabold px-2.5 py-1 rounded-full border"
          style={{ color, borderColor: `${color}55`, background: `${color}14` }}
        >
          {article.tag}
        </span>
      </div>

      <h3
        className="relative z-10 text-[0.92rem] font-extrabold leading-snug mb-1.5 line-clamp-2"
        style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
      >
        {article.title}
      </h3>
      <p className="relative z-10 text-[0.74rem] leading-relaxed flex-1 line-clamp-2" style={{ color: "var(--text3)" }}>
        {article.desc}
      </p>

      <span
        className="relative z-10 self-end mt-2.5 w-[26px] h-[26px] rounded-lg flex items-center justify-center border transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ borderColor: "var(--border)", color, background: "linear-gradient(145deg, var(--bg2), var(--bg3))" }}
      >
        <ArrowUpRight size={14} aria-hidden="true" />
      </span>
    </a>
  );
}

function ReadMoreCard() {
  const tilt = useTilt(9);

  return (
    <a
      href={newsletter.followUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={tilt.ref}
      onMouseEnter={tilt.onEnter}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="group no-underline relative flex flex-col items-center justify-center text-center overflow-hidden rounded-[20px] p-5 border transition-shadow duration-300 [transform-style:preserve-3d]"
      style={{
        background: "linear-gradient(150deg, var(--bg2), var(--bg3))",
        borderColor: "rgba(34,211,238,.35)",
        boxShadow: "var(--neu-out)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,.16), transparent 70%)" }}
      />

      <div
        className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center mb-3 border transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ borderColor: "rgba(34,211,238,.35)", background: "rgba(34,211,238,.1)" }}
      >
        <FaLinkedin size={18} aria-hidden="true" style={{ color: "#22d3ee" }} />
      </div>

      <h3 className="relative z-10 text-[0.92rem] font-extrabold mb-1" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
        Read More Articles
      </h3>
      <p className="relative z-10 text-[0.72rem] mb-3" style={{ color: "var(--text3)" }}>
        Full archive on LinkedIn
      </p>

      <span className="relative z-10 inline-flex items-center gap-1.5 text-[0.76rem] font-extrabold" style={{ color: "#22d3ee" }}>
        View newsletter <ArrowUpRight size={14} aria-hidden="true" />
      </span>
    </a>
  );
}

export default function Writing() {
  const [featured, ...rest] = newsletter.articles;
  const tickerLoop = [...TICKER_TOPICS, ...TICKER_TOPICS];

  return (
    <section id="writing" aria-labelledby="writing-heading" className="relative overflow-hidden" style={{ background: "var(--bg1)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(34,211,238,0.06), transparent 65%), radial-gradient(ellipse 50% 35% at 100% 30%, rgba(167,139,250,0.05), transparent 65%)",
        }}
      />

      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase hidden sm:block"
        aria-hidden="true"
        style={{ fontSize: "6rem", letterSpacing: "-2px", color: "var(--text1)", opacity: 0.05, fontFamily: "var(--font)" }}
      >
        WRITING
      </div>

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="Newsletter"
          title={<>Recent <span className="g-text">Articles</span></>}
          subtitle={newsletter.tagline}
        />

        <Reveal delay={60}>
          <div
            className="relative overflow-hidden mb-8 py-3 border-y group/ticker"
            style={{
              borderColor: "var(--border)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex gap-7 whitespace-nowrap w-max animate-[wrTicker_26s_linear_infinite] group-hover/ticker:[animation-play-state:paused]">
              {tickerLoop.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-7 text-[0.72rem] font-bold tracking-[1.5px]"
                  style={{ color: "var(--text3)", fontFamily: "var(--mono, monospace)" }}
                >
                  {t} <span className="w-1 h-1 rounded-full bg-[#22d3ee] opacity-60" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto lg:auto-rows-[172px] mb-14">
            <FeaturedCard article={featured} />
            {rest.map((article, i) => (
              <ArticleCard key={article.title} article={article} index={i} />
            ))}
            <ReadMoreCard />
          </div>
        </Reveal>

        {/* ── CTA banner ── */}
        <Reveal delay={240}>
          <div
            className="relative overflow-hidden rounded-3xl p-7 sm:p-9 flex flex-wrap items-center justify-between gap-6 border"
            style={{
              background: "linear-gradient(150deg, var(--bg2), var(--bg3))",
              borderColor: "var(--border)",
              boxShadow: "var(--neu-out)",
            }}
          >
            <div
              className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full pointer-events-none opacity-[0.14] blur-[80px] bg-[#22d3ee]"
              aria-hidden="true"
            />

            <div className="relative z-10 flex items-center gap-4">
              <div
                className="w-[50px] h-[50px] rounded-2xl flex items-center justify-center flex-shrink-0 border"
                style={{
                  background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
                  borderColor: "var(--border)",
                  boxShadow: "var(--neu-out-sm)",
                }}
              >
                <Radio size={20} aria-hidden="true" className="text-[#22d3ee]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full bg-[#22d3ee] flex-shrink-0 animate-[wrPulseIcn_1.6s_ease-in-out_infinite]"
                    style={{ boxShadow: "0 0 10px #22d3ee" }}
                    aria-hidden="true"
                  />
                  <p className="text-[0.92rem] font-extrabold" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
                    {newsletter.subscribers} developers already reading
                  </p>
                </div>
                <p className="text-[0.78rem]" style={{ color: "var(--text3)" }}>
                  Join {newsletter.name} for weekly AI &amp; frontend breakdowns.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 w-full sm:w-auto">
              <a
                href={newsletter.followUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl no-underline text-sm font-bold text-white bg-[#0A66C2]"
                style={{ boxShadow: "0 8px 20px -6px rgba(10,102,194,0.5)"}}
                aria-label={`Follow ${newsletter.name} newsletter on LinkedIn`}
              >
                <FaLinkedin size={16} aria-hidden="true" /> Follow Newsletter
              </a>
              <a
                href={newsletter.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl no-underline text-sm font-bold border"
                style={{
                  color: "var(--text1)",
                  borderColor: "var(--border)",
                  background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
                }}
                aria-label={`Join the ${newsletter.name} developer community group on LinkedIn`}
              >
                <Users size={16} aria-hidden="true" /> Join Community
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @property --wr-angle{ syntax:'<angle>'; inherits:false; initial-value:0deg; }
        @keyframes wrRotate{ to{ --wr-angle:360deg; } }
        @keyframes wrTicker{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
        @keyframes wrPulseIcn{ 0%,100%{ opacity:1; } 50%{ opacity:.35; } }
      `}</style>
    </section>
  );
}