/* eslint-disable no-unused-vars */
import { useRef, useCallback } from "react";
import { personal, socials, Resume, newsletter } from "../../data/index";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Download } from "lucide-react";
import MYImg from "../../assets/About.webp";
import Reveal from "../ui/Reveal";

const SOCIAL_ICONS = { FaGithub, FaLinkedin, FaYoutube, FaInstagram, SiLeetcode, FaWhatsapp, FaFacebook };

const DETAIL_ACCENTS = ["#6366f1", "#10d9a0", "#f59e0b", "#f472b6"];

export default function About() {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return;
    const rect = rectRef.current;
    if (!rect || !cardRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el || !rect) {
        rafRef.current = null;
        return;
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);
      el.style.transform = `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
      el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    e.currentTarget.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg)";
  }, []);

  const details = [
    { label: "Location", value: personal.location, icon: "📍" },
    { label: "Email", value: personal.email, icon: "✉️" },
    { label: "Phone", value: personal.phone, icon: "📞" },
    { label: "Status", value: personal.status, icon: "💼" },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative" style={{ background: "var(--bg1)", overflow: "hidden" }}>
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
        ABOUT
      </div>

      <div className="section-wrap relative z-10">
        <Reveal>
          <div className="mb-14">
            <div
              className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
              style={{ color: "var(--accent-h)" }}
              aria-hidden="true"
            >
              <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: "var(--accent-h)" }} />
              About Me
            </div>
            <h2
              id="about-heading"
              className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
              style={{ fontFamily: "var(--font)" }}
            >
              Who <span className="g-text">Am I?</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
          {/* ── Image Card ── */}
          <Reveal className="flex flex-col items-center lg:items-start gap-6">
            <div className="relative w-full max-w-[320px] mx-auto lg:mx-0">
              <div className="relative" style={{ padding: "1px", borderRadius: "1rem" }}>
                <div aria-hidden="true" className="about-card-glow" />
                <div
                  ref={cardRef}
                  className="about-card relative rounded-2xl overflow-hidden z-10"
                  style={{
                    background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                    boxShadow: "var(--neu-out)",
                    border: "1px solid var(--border)",
                    padding: "6px",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div aria-hidden="true" className="about-spotlight" />
                  <div className="about-card-img relative overflow-hidden rounded-xl">
                    <img
                      src={MYImg}
                      alt={`${personal.name} — ${personal.role} from ${personal.location}`}
                      className="w-full object-cover object-top block"
                      style={{ aspectRatio: "4/5" }}
                      loading="lazy"
                      decoding="async"
                      width={308}
                      height={385}
                    />
                  </div>
                  <div
                    className="about-card-name absolute bottom-0 left-0 right-0 rounded-b-xl px-4 py-2.5 flex items-center justify-between"
                    style={{ background: "linear-gradient(145deg,var(--bg2),var(--bg3))" }}
                  >
                    <div>
                      <p className="font-bold text-sm leading-tight" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
                        {personal.name}
                      </p>
                      <p className="text-[11px] font-medium" style={{ color: "var(--accent-h)" }}>
                        {personal.role}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(16,217,160,0.12)", border: "1px solid rgba(16,217,160,0.25)" }}
                      aria-label="Availability: Available for work"
                    >
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "blink 1.5s ease infinite" }} />
                      <span className="text-[10px] font-bold" style={{ color: "var(--green)" }}>
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2.5 justify-center lg:justify-start list-none p-0 m-0" aria-label="Social media links">
              {socials.map((s, i) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <li key={s.name} className="hero-social skill-pill-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${personal.name} on ${s.name} (opens in new tab)`}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                      style={{
                        background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                        boxShadow: "var(--neu-out-sm)",
                        border: "1px solid var(--border)",
                        color: s.color,
                      }}
                    >
                      {Icon && <Icon size={15} aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* ── Text Content ── */}
          <Reveal className="flex flex-col gap-7" delay={120}>
            <div className="relative pl-5">
              <span
                className="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full"
                style={{ background: "linear-gradient(180deg, var(--accent), var(--green))" }}
                aria-hidden
              />
              <p className="text-[1rem] leading-[1.9]" style={{ color: "var(--text2)" }}>
                {personal.Aboutbio}
              </p>
            </div>

            <a
              href={newsletter.followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift relative overflow-hidden flex items-center gap-3 rounded-xl px-4 py-3 no-underline"
              style={{
                background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                boxShadow: "var(--neu-out-sm)",
                border: "1px solid rgba(34,211,238,0.25)",
              }}
            >
              <div
                aria-hidden="true"
                className="relative z-10 w-9 h-9 rounded-lg text-base flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)" }}
              >
                ✍️
              </div>
              <div className="relative z-10 min-w-0">
                <p className="text-[0.85rem] font-semibold" style={{ color: "var(--text1)" }}>
                  I also write on my {newsletter.platform} — {newsletter.subscribers} subscribers
                </p>
                <p className="text-[0.75rem]" style={{ color: "var(--text3)" }}>
                  Frontend tutorials & dev breakdowns. Tap to follow →
                </p>
              </div>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.map((item, i) => {
                const color = DETAIL_ACCENTS[i % DETAIL_ACCENTS.length];
                return (
                  <div
                    key={item.label}
                    className="hover-lift relative overflow-hidden flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                      boxShadow: "var(--neu-out-sm)",
                      border: `1px solid ${color}25`,
                    }}
                  >
                    <div
                      className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{ background: color, filter: "blur(28px)", opacity: 0.14 }}
                      aria-hidden
                    />
                    <div
                      aria-hidden="true"
                      className="relative z-10 w-8 h-8 rounded-lg text-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                    >
                      {item.icon}
                    </div>
                    <div className="relative z-10 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: "var(--text3)" }}>
                        {item.label}
                      </p>
                      <p className="text-[0.82rem] font-semibold truncate" style={{ color: "var(--text1)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}