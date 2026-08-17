/* eslint-disable react-hooks/refs */
import { useRef, useCallback } from "react";
import { newsletter } from "../../data/index";
import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight, Users, PenLine, Sparkles } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

const TAG_COLORS = ["#22d3ee", "#a78bfa", "#f59e0b", "#f472b6", "#34d399"];

/* ── shared 3D tilt + spotlight hook ── */
function useTilt(strength = 6) {
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
        el.style.transform = `perspective(800px) rotateY(${dx * strength}deg) rotateX(${-dy * strength}deg) translateZ(6px)`;
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
    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);

  return { ref, onEnter, onMove, onLeave };
}

function FeaturedArticleCard({ article }) {
  const tilt = useTilt(4);
  const color = TAG_COLORS[0];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={tilt.ref}
      onMouseEnter={tilt.onEnter}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="writing-card relative flex flex-col justify-between rounded-3xl overflow-hidden p-8 no-underline lg:col-span-2"
      style={{
        background: "linear-gradient(150deg, var(--bg2), var(--bg3))",
        border: "1px solid var(--border)",
        boxShadow: "var(--neu-out)",
        minHeight: "280px",
        "--w-color": color,
      }}
    >
      <div className="writing-glow-ring" aria-hidden style={{ "--w-color": color }} />
      <div className="writing-spotlight" aria-hidden />

      <div
        className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: color, filter: "blur(60px)", opacity: 0.16 }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
          >
            <Sparkles size={11} aria-hidden="true" /> Latest Article
          </span>
          <span
            className="text-[10px] font-bold px-2.5 py-1.5 rounded-full"
            style={{ background: "var(--bg1)", border: "1px solid var(--border)", color: "var(--text3)" }}
          >
            {article.tag}
          </span>
        </div>

        <h3
          className="font-black leading-tight mb-3 text-[clamp(1.4rem,2.4vw,2rem)]"
          style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
        >
          {article.title}
        </h3>
        <p className="text-[0.9rem] leading-relaxed max-w-lg" style={{ color: "var(--text2)" }}>
          {article.desc}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2 mt-6 text-sm font-bold" style={{ color }}>
        Read the full breakdown
        <ArrowUpRight size={16} aria-hidden="true" className="group-hover:translate-x-1" />
      </div>
    </a>
  );
}

function ArticleCard({ article, index }) {
  const tilt = useTilt(8);
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
      className="writing-card relative flex flex-col justify-between rounded-2xl overflow-hidden p-6 no-underline"
      style={{
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: "1px solid var(--border)",
        boxShadow: "var(--neu-out)",
        minHeight: "210px",
        "--w-color": color,
      }}
    >
      <div className="writing-glow-ring" aria-hidden style={{ "--w-color": color }} />
      <div className="writing-spotlight" aria-hidden />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
          >
            {article.tag}
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <ArrowUpRight size={13} aria-hidden="true" style={{ color }} />
          </div>
        </div>

        <h3 className="text-[0.95rem] font-black mb-2 leading-tight" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
          {article.title}
        </h3>
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--text2)" }}>
          {article.desc}
        </p>
      </div>
    </a>
  );
}

export default function Writing() {
  const [featured, ...rest] = newsletter.articles;

  return (
    <section id="writing" aria-labelledby="writing-heading" className="relative overflow-hidden" style={{ background: "var(--bg1)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(34,211,238,0.07) 0%, transparent 70%)" }}
      />

      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase hidden sm:block"
        aria-hidden
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

        {/* ── Bento grid: featured + rest ── */}
        <Reveal delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <FeaturedArticleCard article={featured} />
            {rest.slice(0, 1).map((article, i) => (
              <ArticleCard key={article.title} article={article} index={i} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {rest.slice(1).map((article, i) => (
              <ArticleCard key={article.title} article={article} index={i + 1} />
            ))}
          </div>
        </Reveal>

        {/* ── CTA banner ── */}
        <Reveal delay={240}>
          <div
            className="writing-cta-bg relative overflow-hidden rounded-3xl mt-8 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ border: "1px solid var(--border)", boxShadow: "var(--neu-out)" }}
          >
            <div
              className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "var(--accent)", filter: "blur(70px)", opacity: 0.18 }}
              aria-hidden
            />

            <div className="relative z-10 flex items-center gap-4">
              <div
                className="writing-icon-float w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(145deg,var(--bg2),var(--bg3))", boxShadow: "var(--neu-out-sm)", border: "1px solid var(--border)" }}
              >
                <PenLine size={22} aria-hidden="true" style={{ color: "var(--accent-h)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="writing-pulse w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22d3ee" }} aria-hidden />
                  <p className="text-[0.95rem] font-black" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
                    {newsletter.subscribers} developers already reading
                  </p>
                </div>
                <p className="text-[0.8rem]" style={{ color: "var(--text3)" }}>
                  Join {newsletter.name} for weekly AI &amp; frontend breakdowns.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 w-full md:w-auto">
              <a
                href={newsletter.followUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl no-underline text-sm font-bold"
                style={{ background: "#0A66C2", color: "#fff", boxShadow: "0 8px 20px -6px rgba(10,102,194,0.55)" }}
                aria-label={`Follow ${newsletter.name} newsletter on LinkedIn`}
              >
                <FaLinkedin size={16} aria-hidden="true" /> Follow Newsletter
              </a>

              <a
                href={newsletter.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl no-underline text-sm font-bold"
                style={{
                  background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                  boxShadow: "var(--neu-out-sm)",
                  border: "1px solid var(--border)",
                  color: "var(--text1)",
                }}
                aria-label={`Join the ${newsletter.name} developer community group on LinkedIn`}
              >
                <Users size={16} aria-hidden="true" style={{ color: "var(--accent-h)" }} /> Join Community
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}