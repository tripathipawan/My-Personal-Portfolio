import { useState } from "react";
import { skillCategories } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

function TabBtn({ cat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0 outline-none active:scale-95 focus-visible:ring-2"
      style={{
        background: active ? `${cat.color}18` : "transparent",
        border: `1px solid ${active ? cat.color + "55" : "var(--border)"}`,
        color: active ? cat.color : "var(--text2)",
        boxShadow: active ? `0 0 16px ${cat.color}20` : "none",
      }}
    >
      <span className="text-base leading-none">{cat.icon}</span>
      <span className="hidden sm:inline">{cat.cat}</span>
      {active && <span className="tab-indicator absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: cat.color }} />}
    </button>
  );
}

function SkillPill({ skill, color, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="skill-pill-in flex items-center gap-2 px-4 py-3 rounded-xl cursor-default select-none transition-all duration-200"
      style={{
        background: hovered ? `${color}15` : "var(--bg3)",
        border: `1px solid ${hovered ? color + "45" : "var(--border)"}`,
        boxShadow: hovered ? `0 4px 20px ${color}20` : "none",
        animationDelay: `${index * 45}ms`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200" style={{ background: color, boxShadow: hovered ? `0 0 6px ${color}` : "none" }} />
      <span className="text-xs font-semibold transition-colors duration-200" style={{ color: hovered ? "var(--text1)" : "var(--text2)" }}>
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

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="Technical Skills"
          title={<>What I <span className="g-text">Work With</span></>}
          subtitle="A comprehensive toolkit built through hands-on projects, continuous learning, and real-world problem solving."
        />

        <Reveal>
          <div className="relative mb-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {skillCategories.map((c, i) => (
                <TabBtn key={c.cat} cat={c} active={active === i} onClick={() => setActive(i)} />
              ))}
            </div>
            <div className="h-px w-full" style={{ background: "var(--border)" }} />
          </div>

          <div key={active} className="panel-swap mt-6 rounded-2xl overflow-hidden" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 panel-icon-in"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}35`, boxShadow: `0 0 20px ${cat.color}20` }}
              >
                {cat.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold mb-1" style={{ color: cat.color, fontFamily: "var(--font)" }}>
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
                    Click any skill to highlight
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

            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {cat.skills.map((skill, i) => (
                  <SkillPill key={skill} skill={skill} color={cat.color} index={i} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Total Skills", value: `${totalSkills}+` },
              { label: "Categories", value: `${skillCategories.length}` },
              { label: "Years Learning", value: "3+" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-4 px-2 rounded-2xl" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
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
    </section>
  );
}