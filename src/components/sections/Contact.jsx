/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { personal } from "../../data/index";
import { store } from "../../utils/store";
import Reveal from "../ui/Reveal";

function NoiseBg() {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
      <defs>
        <filter id="c-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#c-noise)" />
    </svg>
  );
}

function DiagLines() {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }} preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={`${i * 14}%`} y1="0%" x2={`${i * 14 + 9}%`} y2="100%" stroke="var(--accent)" strokeWidth="1" />
      ))}
    </svg>
  );
}

function CursorGlow({ parentRef }) {
  const glowRef = useRef(null);
  useEffect(() => {
    const el = parentRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const move = (ev) => {
      const r = el.getBoundingClientRect();
      glow.style.transform = `translate(${ev.clientX - r.left - 160}px,${ev.clientY - r.top - 160}px)`;
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, [parentRef]);
  return (
    <div
      ref={glowRef}
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        width: 320,
        height: 320,
        top: 0,
        left: 0,
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        transition: "transform 0.18s ease",
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "var(--green)", opacity: 0.7 }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "var(--green)" }} />
    </span>
  );
}

const FL = ({ label }) => (
  <label className="block text-[10px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: "var(--text3)" }}>
    {label}
  </label>
);

function StyledField({ as = "input", err, ...props }) {
  const [focused, setFocused] = useState(false);
  const Tag = as;
  return (
    <div className="relative">
      <Tag
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className="w-full transition-all duration-200 placeholder:text-[color:var(--text3)]"
        style={{
          padding: as === "textarea" ? "14px 16px" : "12px 16px",
          borderRadius: 14,
          background: "var(--bg3)",
          boxShadow: focused ? "var(--neu-in-sm), 0 0 0 3px var(--border-h)" : "var(--neu-in-sm)",
          border: `1px solid ${err ? "rgba(248,113,113,0.6)" : focused ? "var(--accent)" : "transparent"}`,
          outline: "none",
          color: "var(--text1)",
          fontFamily: "var(--font)",
          fontSize: "0.875rem",
          resize: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 1,
          left: 16,
          right: 16,
          height: 1,
          background: "linear-gradient(90deg, var(--accent), var(--green))",
          borderRadius: 1,
          opacity: focused ? 1 : 0,
          transform: focused ? "scaleX(1)" : "scaleX(0)",
          transition: "opacity 0.25s, transform 0.25s",
          transformOrigin: "left",
        }}
      />
      {err && (
        <p className="text-[11px] mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }}>
          ⚠ {err}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const timerRef = useRef(null);

  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState({});
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const d = store.draft.get();
    if (d && Object.values(d).some(Boolean)) {
      setF(d);
      setNote("💾 Draft restored");
      setTimeout(() => setNote(""), 2600);
    }
  }, []);

  const change = (ev) => {
    const { name, value } = ev.target;
    setF((p) => {
      const u = { ...p, [name]: value };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        store.draft.save(u);
        setNote("✅ Draft saved");
        setTimeout(() => setNote(""), 1600);
      }, 700);
      return u;
    });
    if (err[name]) setErr((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Required";
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Valid email required";
    if (!f.message.trim()) e.message = "Required";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErr(e);
      return;
    }
    setBusy(true);
    try {
      await emailjs.send(
        "service_bcj0gjg",
        "template_v8ol7lc",
        { name: f.name, email: f.email, title: f.subject || "No Subject", message: f.message, time: new Date().toLocaleString() },
        import.meta.env.VITE_EMAILJS_KEY,
      );
      store.draft.clear();
      setDone(true);
    } catch (e) {
      console.error(e);
      setNote("❌ Send failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const INFO = [
    { icon: "✉", label: "Email", val: personal.email, green: false },
    { icon: "☏", label: "Phone", val: personal.phone, green: false },
    { icon: "◎", label: "Location", val: personal.location, green: false },
    { icon: "◈", label: "Status", val: "Available for work", green: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "var(--bg0)" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 80% 55%, var(--accent-glow), transparent)",
            "radial-gradient(ellipse 35% 50% at 10% 25%, rgba(16,217,160,0.06), transparent)",
          ].join(","),
          opacity: 0.5,
        }}
      />
      <NoiseBg />

      <div aria-hidden className="absolute pointer-events-none" style={{ right: "7%", top: "20%" }}>
        {[340, 210, 110].map((sz, i) => (
          <div
            key={sz}
            className="absolute rounded-full border"
            style={{
              width: sz,
              height: sz,
              marginLeft: -sz / 2,
              marginTop: -sz / 2,
              top: "50%",
              left: "50%",
              borderColor: ["var(--accent)", "var(--green)", "var(--accent-h)"][i],
              borderStyle: "dashed",
              opacity: 0.1,
              animation: `${i % 2 === 0 ? "spin-slow" : "spinCCW"} ${[32, 22, 14][i]}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="section-wrap relative z-10">
        {/* ══ HEADING ══ */}
        <div className="mb-16">
          <Reveal
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.18em] uppercase mb-5 neu-sm"
            style={{ color: "var(--accent-h)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)", animation: "blink 2s ease infinite" }} />
            Get In Touch
          </Reveal>

          <Reveal as="h2" delay={130} className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]" style={{ fontFamily: "var(--font)" }}>
            Let's Work
            <br />
            <span className="g-text">Together</span>
          </Reveal>

          <Reveal as="p" delay={260} className="mt-4 text-[0.95rem] leading-[1.85] max-w-[440px]" style={{ color: "var(--text2)" }}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </Reveal>
        </div>

        {/* ══ BODY ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
          {/* ════ LEFT ════ */}
          <Reveal dir="l" className="flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden p-7 neu" style={{ border: "1px solid var(--border-h)" }}>
              <DiagLines />
              <div
                aria-hidden
                className="absolute -right-2 -top-4 font-black leading-none select-none pointer-events-none"
                style={{ fontSize: "clamp(6rem,14vw,10rem)", color: "var(--accent)", opacity: 0.06, fontFamily: "var(--font)" }}
              >
                875
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-6">
                  <PulseDot />
                  <span className="text-[10px] font-black tracking-[0.22em] uppercase" style={{ color: "var(--green)" }}>
                    Available for work
                  </span>
                </div>

                <h3
                  className="font-black leading-[1.15] mb-4"
                  style={{ fontFamily: "var(--font)", fontSize: "clamp(1.4rem,2.8vw,1.9rem)", color: "var(--text1)" }}
                >
                  Let's build
                  <br />
                  <span className="g-text">something great</span>
                </h3>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text2)" }}>
                  Startup product, freelance gig, or full-time role — I'm just one message away.
                </p>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[11px] font-bold neu-sm" style={{ color: "var(--text2)" }}>
                  ⚡ Typically replies within 24h
                </div>
              </div>
            </div>

            {INFO.map((item, i) => (
              <Reveal
                key={item.label}
                dir="l"
                delay={250 + i * 100}
                className="info-row relative flex items-center gap-4 px-5 py-3 rounded-2xl overflow-hidden cursor-default neu-sm"
                style={{ border: "1px solid var(--border)" }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-base font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-h))",
                    boxShadow: "0 4px 14px var(--accent-glow)",
                    fontFamily: "monospace",
                  }}
                >
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[9px] uppercase tracking-[0.18em] font-black mb-0.5" style={{ color: "var(--text3)" }}>
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold truncate" style={{ color: item.green ? "var(--green)" : "var(--text1)" }}>
                    {item.val}
                  </div>
                </div>

                <span className="info-row-arrow text-xs font-bold" style={{ color: "var(--accent-h)" }}>
                  →
                </span>
              </Reveal>
            ))}
          </Reveal>

          {/* ════ RIGHT: form card ════ */}
          <Reveal dir="r" as="div" delay={100}>
            <div ref={formRef} className="relative rounded-3xl overflow-hidden neu" style={{ border: "1px solid var(--border-h)" }}>
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <CursorGlow parentRef={formRef} />
              </div>

              <div
                style={{ height: 2, background: "linear-gradient(90deg, transparent, var(--accent), var(--accent-h), var(--green), transparent)" }}
              />

              <div className="relative z-10 p-8">
                {done ? (
                  <div className="flex flex-col items-center text-center py-16" style={{ animation: "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-7 neu" style={{ border: "1px solid var(--border-h)" }}>
                      🎉
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(16,217,160,0.18), transparent 70%)", animation: "glowPulse 2s ease infinite" }}
                      />
                    </div>
                    <h3 className="font-black text-2xl mb-3" style={{ fontFamily: "var(--font)" }}>
                      Message Sent! 🚀
                    </h3>
                    <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "var(--text2)" }}>
                      Thanks, <strong style={{ color: "var(--accent-h)" }}>{f.name}</strong>!<br />
                      I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setDone(false);
                        setF({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-7 py-3 rounded-xl text-sm font-black text-white hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
                      style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-h))", boxShadow: "0 4px 20px var(--accent-glow)" }}
                    >
                      Send Another →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-black text-xl mb-0.5" style={{ fontFamily: "var(--font)", color: "var(--text1)" }}>
                          Send a message
                        </h3>
                        <p className="text-[11px] tracking-widest uppercase" style={{ color: "var(--text3)" }}>
                          Fields marked * are required
                        </p>
                      </div>
                      <div className="flex gap-1.5 mt-1.5">
                        {["#f87171", "var(--amber)", "var(--green)"].map((c, i) => (
                          <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <FL label="Your Name *" />
                        <StyledField as="input" name="name" value={f.name} onChange={change} placeholder="Pawan Tripathi" err={err.name} />
                      </div>
                      <div>
                        <FL label="Email *" />
                        <StyledField as="input" type="email" name="email" value={f.email} onChange={change} placeholder="you@example.com" err={err.email} />
                      </div>
                    </div>

                    <div>
                      <FL label="Subject" />
                      <StyledField as="input" name="subject" value={f.subject} onChange={change} placeholder="Project Collaboration / Job Opportunity" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <FL label="Message *" />
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full transition-all duration-300 neu-sm"
                          style={{
                            color: f.message.length > 10 ? "var(--green)" : "var(--text3)",
                            border: `1px solid ${f.message.length > 10 ? "rgba(16,217,160,0.25)" : "var(--border)"}`,
                          }}
                        >
                          {f.message.length} chars
                        </span>
                      </div>
                      <StyledField
                        as="textarea"
                        name="message"
                        value={f.message}
                        onChange={change}
                        rows={5}
                        placeholder="Tell me about your project, idea, or opportunity..."
                        err={err.message}
                      />
                    </div>

                    {note && (
                      <p className="text-[11px] text-right" style={{ color: "var(--text3)" }}>
                        {note}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={busy}
                      className="group relative w-full py-4 rounded-2xl font-black text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.97] disabled:opacity-50"
                      style={{
                        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-h) 60%, #a78bfa 100%)",
                        boxShadow: "0 8px 30px var(--accent-glow)",
                        fontFamily: "var(--font)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)" }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {busy ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" style={{ animation: "spinCW 0.6s linear infinite" }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <span style={{ animation: "nudgeRight 1.8s ease infinite" }}>🚀</span>
                          </>
                        )}
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-5 flex-wrap">
                      {["🔒 Secure", "⚡ 24h Reply", "🎯 No Spam"].map((t) => (
                        <span key={t} className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text3)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}