import { useRef, useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects as projectsData, socials } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";

const ROTATIONS_DESKTOP = [-5, 4, -3, 5, -4, 3];
const ROTATIONS_MOBILE = [-2, 1.5, -1, 2, -1.5, 1];

const SCROLL_TRAVEL = 110;

function useCardMeasure(threshold = 0.55) {
  const ref = useRef(null);
  const [locked, setLocked] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setLocked(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setHeight(entry.contentRect.height);
    });
    ro.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, [threshold]);

  return [ref, locked, height];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

function ProjectCard({ project, index, onActivate }) {
  const [cardRef, locked, height] = useCardMeasure();
  const isMobile = useIsMobile();
  const rotations = isMobile ? ROTATIONS_MOBILE : ROTATIONS_DESKTOP;
  const rot = rotations[index % rotations.length];

  useEffect(() => {
    if (locked) onActivate(project.color);
  }, [locked, project.color, onActivate]);

  return (
    <div style={{ height: height ? height + SCROLL_TRAVEL : undefined }}>
      <div
        ref={cardRef}
        className="sticky top-[80px] sm:top-[90px] lg:top-[100px] rounded-2xl border p-5 sm:p-7 lg:p-9 flex flex-col md:flex-row gap-6 md:gap-8"
        style={{
          background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
          borderColor: locked ? `${project.color}55` : "var(--border)",
          boxShadow: locked
            ? `0 22px 55px ${project.color}22`
            : "0 22px 55px rgba(0,0,0,.5)",
          transform: locked
            ? "rotate(0deg) scale(1)"
            : `rotate(${rot}deg) scale(0.94)`,
          opacity: locked ? 1 : 0.5,
          transition:
            "transform .55s cubic-bezier(.34,1.56,.64,1), opacity .4s ease, border-color .5s ease, box-shadow .5s ease",
        }}
      >
        <div
          className="w-full md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0"
          style={{ background: "var(--bg1)" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div
            className="h-[3px] w-10 rounded-full mb-4"
            style={{ background: project.color }}
          />
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-black mb-2 leading-tight"
            style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--text2)" }}
          >
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}40`,
                  background: `${project.color}14`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wide"
              style={{ color: project.color }}
            >
              <span className="w-5 h-px" style={{ background: project.color }} />
              Live project <FaExternalLinkAlt size={10} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono"
                style={{ border: "1px solid var(--border)", color: "var(--text2)" }}
              >
                <FaGithub size={13} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Matches the "More on GitHub" card from your reference screenshot.
function GithubCTACard({ index, onActivate }) {
  const [cardRef, locked, height] = useCardMeasure();
  const isMobile = useIsMobile();
  const rotations = isMobile ? ROTATIONS_MOBILE : ROTATIONS_DESKTOP;
  const rot = rotations[index % rotations.length];
  const accent = "#818cf8";

  useEffect(() => {
    if (locked) onActivate(accent);
  }, [locked, onActivate]);

  const github = socials.find((s) => s.name === "GitHub");

  return (
    <div style={{ height: height ? height + SCROLL_TRAVEL : undefined }}>
      <a
        ref={cardRef}
        href={github?.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky top-[80px] sm:top-[90px] lg:top-[100px] flex flex-col items-center justify-center text-center gap-3 rounded-2xl border p-8 sm:p-10 no-underline min-h-[240px]"
        style={{
          background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
          borderColor: locked ? `${accent}55` : "var(--border)",
          boxShadow: locked
            ? `0 22px 55px ${accent}22`
            : "0 22px 55px rgba(0,0,0,.5)",
          transform: locked
            ? "rotate(0deg) scale(1)"
            : `rotate(${rot}deg) scale(0.94)`,
          opacity: locked ? 1 : 0.5,
          transition:
            "transform .55s cubic-bezier(.34,1.56,.64,1), opacity .4s ease, border-color .5s ease, box-shadow .5s ease",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
        >
          <FaGithub size={24} style={{ color: "var(--text2)" }} />
        </div>
        <p className="text-xl sm:text-2xl font-black" style={{ color: "var(--text2)" }}>
          More on <span className="g-text italic">GitHub</span>
        </p>
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-wide"
          style={{ border: `1px solid ${accent}30`, background: `${accent}10`, color: accent }}
        >
          <FaGithub size={13} />
          65+ Repositories
        </span>
        <p className="text-[10px] tracking-widest uppercase font-mono" style={{ color: "var(--text3)" }}>
          View all projects →
        </p>
      </a>
    </div>
  );
}

export default function Projects() {
  const [ambient, setAmbient] = useState(projectsData[0]?.color || "#6366f1");

  return (
    <section id="projects" className="relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden
        style={{
          background: `radial-gradient(600px circle at 50% 30%, ${ambient}22, transparent 70%)`,
          opacity: 0.6,
          transition: "background 1s ease",
        }}
      />

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="g-text">built</span>.
            </>
          }
          subtitle="Scroll through — each project locks into place as it reaches the center, and the ambient glow shifts to match it."
        />

        <div className="flex flex-col">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onActivate={setAmbient} />
          ))}
          <GithubCTACard index={projectsData.length} onActivate={setAmbient} />
        </div>
      </div>
    </section>
  );
}