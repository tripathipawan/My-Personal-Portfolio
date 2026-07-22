/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
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
        className="flex flex-col items-center justify-center py-5 sm:py-7 px-4 relative transition-all duration-300 focus:outline-none"
        style={{ borderRight: "1px solid var(--border)", background: active === "edu" ? "rgba(16,217,160,0.05)" : "transparent" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scoreboard-bar"
          style={{ opacity: active === "edu" ? 1 : 0, background: "linear-gradient(90deg,transparent,var(--green),transparent)" }}
        />
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "var(--green)" }}>
          Education
        </span>
        <span
          className="text-4xl sm:text-5xl font-black leading-none tabular-nums scoreboard-num"
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
        className="flex flex-col items-center justify-center py-5 sm:py-7 px-4 relative transition-all duration-300 focus:outline-none"
        style={{ background: active === "exp" ? "rgba(99,102,241,0.06)" : "transparent" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scoreboard-bar"
          style={{ opacity: active === "exp" ? 1 : 0, background: "linear-gradient(90deg,transparent,var(--accent-h),transparent)" }}
        />
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: "var(--accent-h)" }}>
          Experience
        </span>
        <span
          className="text-4xl sm:text-5xl font-black leading-none tabular-nums scoreboard-num"
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

// ── Education Card ──
function EduCard({ edu, index }) {
  return (
    <Reveal dir="r" delay={index * 100}>
      <div
        className="rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-transform duration-200 hover:translate-x-1"
        style={{ background: "linear-gradient(145deg,var(--bg2),var(--bg3))", boxShadow: "var(--neu-out)", border: "1px solid var(--border)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,var(--green),var(--accent-h))" }} />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
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

        <p className="text-[0.85rem] leading-[1.8] mb-4" style={{ color: "var(--text2)" }}>
          {edu.desc}
        </p>

        <div className="flex flex-wrap gap-2">
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
    </Reveal>
  );
}

// ── Experience Card ──
function ExpCard({ exp, index }) {
  return (
    <Reveal dir="l" delay={index * 100}>
      <div
        className="rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-transform duration-200 hover:translate-x-1"
        style={{
          background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
          boxShadow: "var(--neu-out)",
          border: exp.current ? "1px solid rgba(99,102,241,0.22)" : "1px solid var(--border)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg,var(--accent),var(--accent-h))" }} />

        <div className="flex flex-col gap-2 mb-4">
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

        <p className="text-[0.85rem] sm:text-[0.88rem] leading-[1.8] mb-5" style={{ color: "var(--text2)" }}>
          {exp.desc}
        </p>

        <div className="flex flex-wrap gap-2">
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
    </Reveal>
  );
}

function EducationPanel() {
  return (
    <div className="flex gap-3 sm:gap-4 panel-swap">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span
          className="text-[10px] font-bold leading-none mb-1"
          style={{ fontFamily: "var(--mono)", color: "var(--text3)", writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.06em" }}
        >
          2025→2019
        </span>
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
    <div className="flex gap-3 sm:gap-4 panel-swap">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span
          className="text-[10px] font-bold leading-none mb-1"
          style={{ fontFamily: "var(--mono)", color: "var(--text3)", writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.06em" }}
        >
          2025→
        </span>
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
    <section id="journey" style={{ background: "var(--bg1)", overflow: "hidden" }}>
      <div className="section-wrap">
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
    </section>
  );
}