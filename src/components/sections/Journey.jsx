/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, experience } from "../../data/index";
import Certifications from "./Certifications";
import Reveal from "../ui/Reveal";

// ── Scoreboard Header ──
function ScoreboardHeader({ active, onSwitch }) {
  return (
    <div
      className="relative grid grid-cols-2 rounded-2xl overflow-hidden mb-8 sm:mb-10"
      style={{ border: "1px solid var(--border)", background: "linear-gradient(145deg,var(--bg2),var(--bg3))", boxShadow: "var(--neu-out)" }}
    >
      <div
        className="absolute top-0 w-1/2 h-full pointer-events-none transition-all duration-500"
        style={{
          left: active === "edu" ? 0 : "50%",
          background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${active === "edu" ? "rgba(16,217,160,0.1)" : "rgba(129,140,248,0.1)"} 0%, transparent 70%)`,
        }}
        aria-hidden
      />

      <div
        className="absolute bottom-0 left-0 w-1/2 h-[2px] pointer-events-none scoreboard-bar"
        style={{
          background: "linear-gradient(90deg,transparent,var(--green),transparent)",
          transform: `scaleX(${active === "edu" ? 1 : 0})`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-1/2 h-[2px] pointer-events-none scoreboard-bar"
        style={{ background: "linear-gradient(90deg,transparent,var(--accent-h),transparent)", opacity: active === "exp" ? 1 : 0 }}
      />

      <button
        onClick={() => onSwitch("edu")}
        className="relative flex flex-col items-center justify-center py-5 sm:py-7 px-4 transition-all duration-300 focus:outline-none"
        style={{ borderRight: "1px solid var(--border)", background: active === "edu" ? "rgba(16,217,160,0.05)" : "transparent" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scoreboard-bar"
          style={{ opacity: active === "edu" ? 1 : 0, background: "linear-gradient(90deg,transparent,var(--green),transparent)" }}
        />
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all duration-300"
          style={{
            background: active === "edu" ? "rgba(16,217,160,0.14)" : "var(--bg3)",
            border: `1px solid ${active === "edu" ? "rgba(16,217,160,0.35)" : "var(--border)"}`,
            transform: active === "edu" ? "scale(1.08)" : "scale(1)",
          }}
        >
          <GraduationCap size={16} style={{ color: active === "edu" ? "var(--green)" : "var(--text3)" }} />
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "var(--green)" }}>
          Education
        </span>
        <span
          key={`edu-${education.length}`}
          className="text-4xl sm:text-5xl font-black leading-none tabular-nums scoreboard-num num-flip-in"
          style={{
            fontFamily: "var(--mono)",
            color: active === "edu" ? "var(--green)" : "var(--text3)",
            textShadow: active === "edu" ? "0 0 24px rgba(16,217,160,0.45)" : "none",
          }}
        >
          {String(education.length).padStart(2, "0")}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold mt-1.5 transition-colors duration-300" style={{ color: active === "edu" ? "var(--text1)" : "var(--text3)" }}>
          Degrees earned
        </span>
      </button>

      <button
        onClick={() => onSwitch("exp")}
        className="relative flex flex-col items-center justify-center py-5 sm:py-7 px-4 transition-all duration-300 focus:outline-none"
        style={{ background: active === "exp" ? "rgba(99,102,241,0.06)" : "transparent" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scoreboard-bar"
          style={{ opacity: active === "exp" ? 1 : 0, background: "linear-gradient(90deg,transparent,var(--accent-h),transparent)" }}
        />
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all duration-300"
          style={{
            background: active === "exp" ? "rgba(99,102,241,0.14)" : "var(--bg3)",
            border: `1px solid ${active === "exp" ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
            transform: active === "exp" ? "scale(1.08)" : "scale(1)",
          }}
        >
          <Briefcase size={16} style={{ color: active === "exp" ? "var(--accent-h)" : "var(--text3)" }} />
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "var(--accent-h)" }}>
          Experience
        </span>
        <span
          key={`exp-${experience.length}`}
          className="text-4xl sm:text-5xl font-black leading-none tabular-nums scoreboard-num num-flip-in"
          style={{
            fontFamily: "var(--mono)",
            color: active === "exp" ? "var(--accent-h)" : "var(--text3)",
            textShadow: active === "exp" ? "0 0 24px rgba(129,140,248,0.45)" : "none",
          }}
        >
          {String(experience.length).padStart(2, "0")}
        </span>
        <span className="text-[11px] sm:text-xs font-semibold mt-1.5 transition-colors duration-300" style={{ color: active === "exp" ? "var(--text1)" : "var(--text3)" }}>
          Active roles
        </span>
      </button>
    </div>
  );
}

// ── Animated Year Bar ──
function YearBar({ color }) {
  return (
    <div className="w-[3px] self-stretch rounded-full flex-shrink-0 mx-1 relative" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div className="absolute top-0 left-0 right-0 rounded-full year-bar-fill" style={{ background: color }} />
    </div>
  );
}

function useTilt(maxTilt = 3) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      if (spotRef.current) {
        spotRef.current.style.opacity = "1";
        spotRef.current.style.background = `radial-gradient(240px circle at ${x}px ${y}px, rgba(255,255,255,0.05), transparent 70%)`;
      }
    },
    [maxTilt]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  return { cardRef, spotRef, handleMove, handleLeave };
}

// ── Education Card ──
function EduCard({ edu, index }) {
  const { cardRef, spotRef, handleMove, handleLeave } = useTilt(2.5);

  return (
    <Reveal dir="r" delay={index * 100}>
      <div className="relative">
        {/* timeline connector node */}
        <span
          className="pulse-dot hidden sm:block absolute -left-[27px] top-7 w-2.5 h-2.5 rounded-full z-10"
          style={{ background: "var(--green)", boxShadow: "0 0 10px rgba(16,217,160,0.6)" }}
          aria-hidden
        />
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="rounded-2xl p-5 sm:p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
            boxShadow: "var(--neu-out)",
            border: "1px solid var(--border)",
            transition: "transform 0.2s ease, border-color 0.3s ease",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <span ref={spotRef} className="absolute inset-0 pointer-events-none transition-opacity duration-200" style={{ opacity: 0 }} aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,var(--green),var(--accent-h))" }} />
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "var(--green)", filter: "blur(50px)", opacity: 0.08 }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-[0.95rem] sm:text-[1rem] mb-1 leading-tight" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
                {edu.degree}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text3)" }}>
                {edu.school} · {edu.loc}
              </p>
            </div>
            <span
              className="text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 self-start"
              style={{
                color: "var(--text2)",
                fontFamily: "var(--mono)",
                background: "linear-gradient(145deg,var(--bg3),var(--bg2))",
                boxShadow: "var(--neu-in-sm)",
                border: "1px solid var(--border)",
              }}
            >
              {edu.period} · {edu.grade}
            </span>
          </div>

          <p className="relative z-10 text-[0.85rem] leading-[1.8] mb-4" style={{ color: "var(--text2)" }}>
            {edu.desc}
          </p>

          <div className="relative z-10 flex flex-wrap gap-2">
            {edu.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(16,217,160,0.08)", color: "var(--green)", border: "1px solid rgba(16,217,160,0.18)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── Experience Card ──
function ExpCard({ exp, index }) {
  const { cardRef, spotRef, handleMove, handleLeave } = useTilt(2.5);

  return (
    <Reveal dir="l" delay={index * 100}>
      <div className="relative">
        {/* timeline connector node */}
        <span
          className="pulse-dot hidden sm:block absolute -left-[27px] top-7 w-2.5 h-2.5 rounded-full z-10"
          style={{ background: "var(--accent-h)", boxShadow: "0 0 10px rgba(129,140,248,0.6)" }}
          aria-hidden
        />
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="rounded-2xl p-5 sm:p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
            boxShadow: "var(--neu-out)",
            border: exp.current ? "1px solid rgba(99,102,241,0.22)" : "1px solid var(--border)",
            transition: "transform 0.2s ease, border-color 0.3s ease",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <span ref={spotRef} className="absolute inset-0 pointer-events-none transition-opacity duration-200" style={{ opacity: 0 }} aria-hidden />
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,var(--accent),var(--accent-h))" }} />
          <div
            className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "var(--accent-h)", filter: "blur(50px)", opacity: 0.08 }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[0.95rem] sm:text-[1.05rem]" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
                {exp.role}
              </h3>
              {exp.current && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(16,217,160,0.15)", color: "var(--green)", border: "1px solid rgba(16,217,160,0.3)" }}
                >
                  Current
                </span>
              )}
            </div>

            <p className="text-sm font-semibold" style={{ color: "var(--accent-h)" }}>
              {exp.company}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
                style={{
                  color: "var(--text2)",
                  fontFamily: "var(--mono)",
                  background: "linear-gradient(145deg,var(--bg3),var(--bg2))",
                  boxShadow: "var(--neu-in-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                {exp.period}
              </span>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-h)", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                {exp.type}
              </span>
            </div>
          </div>

          <p className="relative z-10 text-[0.85rem] sm:text-[0.88rem] leading-[1.8] mb-5" style={{ color: "var(--text2)" }}>
            {exp.desc}
          </p>

          <div className="relative z-10 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent-h)", border: "1px solid rgba(99,102,241,0.18)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function EducationPanel() {
  return (
    <div className="flex gap-3 sm:gap-4 journey-panel-3d">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <YearBar color="linear-gradient(to bottom,var(--green),rgba(16,217,160,0.12))" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {education.map((edu, i) => (
          <EduCard key={edu.id} edu={edu} index={i} />
        ))}
      </div>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="flex gap-3 sm:gap-4 journey-panel-3d">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <YearBar color="linear-gradient(to bottom,var(--accent-h),rgba(129,140,248,0.12))" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {experience.map((exp, i) => (
          <ExpCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  const [active, setActive] = useState("edu");

  return (
    <section id="journey" className="relative" style={{ background: "var(--bg1)", overflow: "hidden" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      {/* giant faint background watermark, consistent with other sections */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase hidden sm:block"
        aria-hidden
        style={{ fontSize: "6rem", letterSpacing: "-2px", color: "var(--text1)", opacity: 0.05, fontFamily: "var(--font)" }}
      >
        JOURNEY
      </div>

      <div className="section-wrap relative z-10">
        <div className="mb-10 sm:mb-14">
          <Reveal className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-1" style={{ color: "var(--accent-h)" }}>
            <span className="inline-block w-7 h-0.5 rounded-full" style={{ background: "var(--accent-h)" }} />
            My Background
          </Reveal>

          <Reveal as="h2" delay={100} className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontFamily: "var(--font)" }}>
            {active === "edu" ? (
              <>
                Edu<span className="g-text">cation</span>
              </>
            ) : (
              <>
                My <span className="g-text">Experience</span>
              </>
            )}
          </Reveal>

          <Reveal as="p" delay={200} className="mt-4 text-[0.95rem] leading-[1.85] max-w-[520px]" style={{ color: "var(--text2)" }}>
            {active === "edu"
              ? "A strong academic foundation combined with hands-on certifications from top platforms."
              : "Hands-on experience building real-world projects, freelancing, and continuously growing as a developer."}
          </Reveal>
        </div>

        <Reveal delay={150}>
          <ScoreboardHeader active={active} onSwitch={(val) => val !== active && setActive(val)} />
        </Reveal>

        {active === "edu" ? (
          <div key="edu">
            <EducationPanel />
            <div className="mt-14">
              <Certifications />
            </div>
          </div>
        ) : (
          <div key="exp">
            <ExperiencePanel />
          </div>
        )}
      </div>

      <style>{`
        .num-flip-in {
          display: inline-block;
          animation: numFlipIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes numFlipIn {
          from { opacity: 0; transform: perspective(400px) rotateX(-70deg) translateY(-6px); }
          to { opacity: 1; transform: perspective(400px) rotateX(0deg) translateY(0); }
        }

        .journey-panel-3d {
          animation: journeyPanelIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes journeyPanelIn {
          from { opacity: 0; transform: perspective(1000px) rotateX(6deg) translateY(16px); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
        }
      `}</style>
    </section>
  );
}