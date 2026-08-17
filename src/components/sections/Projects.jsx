import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects as projectsData, socials, stats } from "../../data/index";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

const GAP = 24;

function useTilt(maxTilt = 3) {
  const cardRef = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    [maxTilt]
  );

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  return { cardRef, handleMove, handleLeave };
}

function ProjectCard({ project }) {
  const { cardRef, handleMove, handleLeave } = useTilt(3);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="project-card relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        width: "clamp(260px, 82vw, 380px)",
        minHeight: 500,
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: "1px solid var(--border)",
        boxShadow: "var(--neu-out)",
        transition: "transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div className="w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: "16 / 10", background: "var(--bg1)" }}>
        <img src={project.image} alt={project.title} loading="lazy" className="project-card-img w-full h-full object-cover block" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-6">
        <div className="h-[2px] w-9 rounded-full mb-3 flex-shrink-0" style={{ background: project.color }} />

        <h3 className="text-lg font-black mb-2 leading-tight flex-shrink-0" style={{ color: "var(--text1)", fontFamily: "var(--font)" }}>
          {project.title}
        </h3>

        <p
          className="text-[13px] leading-relaxed mb-5 flex-shrink-0"
          style={{
            color: "var(--text2)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "62px",
          }}
        >
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5 mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
              color: "#fff",
              boxShadow: `0 6px 18px ${project.color}35`,
            }}
          >
            <FaExternalLinkAlt size={10} aria-hidden="true" />
            Live Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: "1px solid var(--border)", color: "var(--text2)", background: "var(--bg3)" }}
            >
              <FaGithub size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function GithubCTACard() {
  const { cardRef, handleMove, handleLeave } = useTilt(3);
  const github = socials.find((s) => s.name === "GitHub");
  const repoStat = stats.find((s) => s.label === "Repositories");
  const accent = "#818cf8";

  return (
    <a
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      href={github?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card flex-shrink-0 rounded-2xl flex flex-col items-center justify-center text-center gap-3 p-8 no-underline"
      style={{
        width: "clamp(260px, 82vw, 380px)",
        minHeight: 500,
        background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
        border: "1px solid var(--border)",
        boxShadow: "var(--neu-out)",
        transition: "transform 0.2s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none"
        style={{ background: accent, filter: "blur(50px)", opacity: 0.1 }}
        aria-hidden
      />
      <div
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
      >
        <FaGithub size={26} aria-hidden="true" style={{ color: "var(--text2)" }} />
      </div>
      <p className="relative z-10 text-xl font-black" style={{ color: "var(--text1)" }}>
        More on <span className="g-text italic">GitHub</span>
      </p>
      <span
        className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide"
        style={{ border: `1px solid ${accent}30`, background: `${accent}10`, color: accent }}
      >
        <FaGithub size={12} aria-hidden="true" />
        {repoStat?.value || "65+"} Repositories
      </span>
      <p className="relative z-10 text-[10px] tracking-widest uppercase font-mono" style={{ color: "var(--text3)" }}>
        View all projects →
      </p>
    </a>
  );
}

export default function Projects() {
  const items = [...projectsData, "github-cta"];
  const n = items.length;
  const loop = [...items, ...items, ...items];

  const trackRef = useRef(null);
  const [index, setIndex] = useState(n);
  const [withTransition, setWithTransition] = useState(true);
  const [cardStep, setCardStep] = useState(320);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".project-card");
    if (card) setCardStep(card.getBoundingClientRect().width + GAP);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const handleTransitionEnd = () => {
    if (index < n) {
      setWithTransition(false);
      setIndex((i) => i + n);
    } else if (index >= 2 * n) {
      setWithTransition(false);
      setIndex((i) => i - n);
    }
  };

  useLayoutEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const go = (dir) => setIndex((i) => i + dir);

  return (
    <section id="projects" className="relative overflow-hidden" style={{ background: "var(--bg0)" }}>
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
        MY WORK
      </div>

      <div className="section-wrap relative z-10">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <span className="g-text">built</span>.
            </>
          }
          subtitle="Browse through — use the arrows to move between projects."
        />

        <Reveal>
          <div className="relative">
            <div className="overflow-hidden w-full max-w-[1200px] mx-auto py-3" style={{ perspective: "1400px" }}>
              <div
                ref={trackRef}
                onTransitionEnd={handleTransitionEnd}
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(-${index * cardStep}px)`,
                  transition: withTransition ? "transform 0.5s cubic-bezier(0.65,0,0.35,1)" : "none",
                }}
              >
                {loop.map((item, i) =>
                  item === "github-cta" ? (
                    <GithubCTACard key={`gh-${i}`} />
                  ) : (
                    <ProjectCard key={`${item.id}-${i}`} project={item} />
                  )
                )}
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover-lift"
                style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--text1)", boxShadow: "var(--neu-out-sm)" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover-lift"
                style={{ background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--text1)", boxShadow: "var(--neu-out-sm)" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
