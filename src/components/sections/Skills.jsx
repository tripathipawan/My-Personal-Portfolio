/* eslint-disable react-hooks/static-components */
import { useRef, useState } from "react";
import {
  Smartphone, Globe, Zap, Boxes, Wrench, Component, Palette,
  Server, Sparkles, Heart, Rocket, Bot, MousePointer2, Code2,
} from "lucide-react";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiReactrouter,
  SiRedux, SiTailwindcss, SiFramer, SiGreensock, SiMui, SiBootstrap,
  SiGit, SiGithub, SiVite, SiWebpack, SiNpm,
  SiVercel, SiNetlify, SiFirebase, SiAxios, SiReplit,
} from "react-icons/si";
import { skillCategories } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

const ICON_MAP = {
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "JavaScript (ES6+)": SiJavascript,
  "TypeScript": SiTypescript,
  "Responsive Design": Smartphone,
  "Web APIs": Globe,

  "React.js": SiReact,
  "React Router": SiReactrouter,
  "React Hooks": Zap,
  "Context API": Boxes,
  "Redux Toolkit": SiRedux,
  "Custom Hooks": Wrench,

  "Tailwind CSS v4": SiTailwindcss,
  "Framer Motion": SiFramer,
  "GSAP": SiGreensock,
  "ShadCN UI": Component,
  "Material UI": SiMui,
  "Bootstrap": SiBootstrap,
  "CSS Animations": Palette,

  "Git": SiGit,
  "GitHub": SiGithub,
  "VS Code": Code2,
  "Vite": SiVite,
  "Webpack": SiWebpack,
  "npm": SiNpm,
  "Vercel": SiVercel,
  "Netlify": SiNetlify,

  "Firebase Auth": SiFirebase,
  "Firestore": SiFirebase,
  "REST APIs": Server,
  "Axios": SiAxios,

  "Claude AI": Sparkles,
  "Lovable.dev": Heart,
  "Emergent": Rocket,
  "Replit": SiReplit,
  "GitHub Copilot": Bot,
  "Cursor AI": MousePointer2,
  "v0 by Vercel": SiVercel,
};

function getIcon(name) {
  return ICON_MAP[name] || Sparkles;
}

function TabBtn({ cat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 outline-none active:scale-90 focus-visible:ring-2 hover-lift"
      style={{
        background: active ? `${cat.color}18` : "var(--bg2)",
        border: `1px solid ${active ? cat.color + "55" : "var(--border)"}`,
        color: active ? cat.color : "var(--text2)",
        boxShadow: active ? `0 0 18px ${cat.color}25` : "var(--neu-out-sm)",
      }}
    >
      <span className="text-base leading-none transition-transform duration-300" style={{ transform: active ? "scale(1.15)" : "scale(1)" }}>
        {cat.icon}
      </span>
      <span className="hidden sm:inline">{cat.cat}</span>
      {active && (
        <span
          className="tab-indicator absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: cat.color }}
        />
      )}
    </button>
  );
}

function SkillPill({ skill, color, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const Icon = getIcon(skill);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.04)`;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(90px circle at ${x}px ${y}px, ${color}30, transparent 70%)`;
      spotRef.current.style.opacity = "1";
    }
  };

  const handleLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="skill-pill-in relative flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-default select-none overflow-hidden"
      style={{
        background: hovered ? `${color}14` : "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: `1px solid ${hovered ? color + "45" : "var(--border)"}`,
        boxShadow: hovered ? `0 10px 26px ${color}25` : "var(--neu-out-sm)",
        transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        animationDelay: `${index * 45}ms`,
      }}
    >
      {/* cursor-follow spotlight */}
      <span ref={spotRef} className="absolute inset-0 pointer-events-none transition-opacity duration-200" style={{ opacity: 0 }} aria-hidden />

      <Icon
        size={16}
        className="relative z-10 flex-shrink-0 transition-transform duration-200"
        style={{ color, transform: hovered ? "scale(1.15) rotate(-6deg)" : "scale(1)" }}
        aria-hidden="true"
      />
      <span className="relative z-10 text-xs font-semibold transition-colors duration-200" style={{ color: hovered ? "var(--text1)" : "var(--text2)" }}>
        {skill}
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];
  const totalSkills = skillCategories.reduce((a, c) => a + c.skills.length, 0);

  return (
    <section id="skills" className="relative overflow-hidden" style={{ background: "var(--bg1)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      {/* giant faint background watermark */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase hidden sm:block"
        aria-hidden
        style={{ fontSize: "6rem", letterSpacing: "-2px", color: "var(--text1)", opacity: 0.05, fontFamily: "var(--font)" }}
      >
        SKILLS
      </div>

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="Technical Skills"
          title={<>What I <span className="g-text">Work With</span></>}
          subtitle="A comprehensive toolkit built through hands-on projects, continuous learning, and real-world problem solving."
        />

        <Reveal>
          {/* tab bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 skills-no-scrollbar" style={{ scrollbarWidth: "none" }}>
            {skillCategories.map((c, i) => (
              <TabBtn key={c.cat} cat={c} active={active === i} onClick={() => setActive(i)} />
            ))}
          </div>

          {/* active category panel */}
          <div className="relative mt-6">
            {/* pulsing gradient glow ring behind the panel */}
            <div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, transparent 20%, ${cat.color} 40%, var(--green) 60%, transparent 80%)`,
                animation: "glowPulse 3s ease-in-out infinite",
                opacity: 0.4,
                filter: "blur(2px)",
              }}
              aria-hidden
            />

            <div
              key={active}
              className="skills-panel-3d relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
                border: `1px solid ${cat.color}30`,
                boxShadow: "var(--neu-out)",
              }}
            >
              {/* top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}22)` }}
                aria-hidden
              />
              {/* glow blob */}
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: cat.color, filter: "blur(70px)", opacity: 0.1 }}
                aria-hidden
              />
              {/* watermark index number */}
              <div
                className="absolute bottom-3 right-5 font-black select-none pointer-events-none"
                style={{ fontFamily: "var(--mono)", fontSize: "4rem", lineHeight: 1, color: cat.color, opacity: 0.06 }}
                aria-hidden
              >
                {String(active + 1).padStart(2, "0")}
              </div>

              <div
                className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 panel-icon-in"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}35`, boxShadow: `0 0 20px ${cat.color}25` }}
                >
                  {cat.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black mb-1" style={{ color: cat.color, fontFamily: "var(--font)" }}>
                    {cat.cat}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}35`, color: cat.color }}
                    >
                      {cat.skills.length} skills
                    </span>
                    <span className="text-xs" style={{ color: "var(--text2)" }}>
                      Hover a skill to tilt it
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                  <span className="text-[10px] font-bold tabular-nums" style={{ color: "var(--text2)" }}>
                    {active + 1} / {skillCategories.length}
                  </span>
                  <div className="flex gap-1" role="tablist" aria-label="Skill category progress">
                    {skillCategories.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="h-1 rounded-full transition-all duration-300 outline-none"
                        style={{ width: i === active ? 20 : 6, background: i === active ? cat.color : "var(--border-h)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-5" style={{ perspective: "800px" }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {cat.skills.map((skill, i) => (
                    <SkillPill key={skill} skill={skill} color={cat.color} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Total Skills", value: `${totalSkills}+` },
              { label: "Categories", value: `${skillCategories.length}` },
              { label: "Years Learning", value: "3+" },
            ].map((s) => (
              <div
                key={s.label}
                className="hover-lift flex flex-col items-center py-4 px-2 rounded-2xl"
                style={{
                  background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--neu-out-sm)",
                }}
              >
                <span className="text-xl sm:text-2xl font-black g-text" style={{ fontFamily: "var(--font)" }}>
                  {s.value}
                </span>
                <span className="text-[10px] sm:text-xs font-medium mt-1 text-center" style={{ color: "var(--text2)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .skills-no-scrollbar::-webkit-scrollbar { display: none; }
        .skills-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .skills-panel-3d {
          animation: skillsPanelEnter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes skillsPanelEnter {
          from { opacity: 0; transform: perspective(1000px) rotateX(8deg) translateY(22px) scale(0.98); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}