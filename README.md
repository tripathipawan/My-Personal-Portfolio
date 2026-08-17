# Pawan Tripathi — Developer Portfolio

A production-deployed personal portfolio website built with React, Vite, Tailwind CSS, and EmailJS. The site is a single-page application with 8 sections — Hero, About, Services, Skills, Journey (Education/Experience toggle with Certifications), Projects, and Contact — each lazy-loaded and animated with a custom `IntersectionObserver`-based reveal system. A fixed scroll-progress bar tracks page depth, a typewriter cycles through 7 professional titles, and a 14-icon MarqueeBar sits between the hero and the rest of the content. The Projects section is a scroll-driven, fanned "stacked card" showcase that straightens and locks each card as it's scrolled into focus. The contact form sends real emails via EmailJS with debounced draft auto-save. Deployed live on Vercel.

---

## Live Demo

**[https://pawantripathi.vercel.app](https://pawantripathi.vercel.app)**

---

## What This Project Does

The portfolio opens on a full-screen hero card with a 3D tilt effect driven by `requestAnimationFrame` — the card responds to mouse position with `perspective(700px) rotateY(Xdeg) rotateX(Ydeg)`, a conic-gradient glow ring pulses behind the profile image, and a radial spotlight follows the cursor. A typewriter loops through 7 role labels. Below the hero, a marquee strip scrolls 14 tech stack icons infinitely. Every subsequent section (About, Services, Skills, Journey, Projects, Contact) loads lazily and reveals via a shared `Reveal` component wrapping `IntersectionObserver`. The Journey section is a "scoreboard" — a two-tab switch between Education and Experience, each with an animated count and its own timeline of cards, with Certifications rendered beneath Education. The Projects section renders each project as a sticky, rotated card that straightens out and locks in place as it scrolls into view, with an ambient background glow that shifts to match the active project's accent color. The Contact form auto-saves drafts to `localStorage` (debounced), restores them on next visit, and sends via the EmailJS SDK using an environment-variable public key.

---

## Architecture — Single-Page App, No Router

The entire portfolio is driven by one `App.jsx` file with no React Router. Navigation is section-scroll only — clicking a nav link calls `smoothScroll(id)`, which scrolls to the target section offset by the fixed navbar height, with a short retry loop in case the section hasn't mounted yet (lazy sections). Each section has an `id` attribute matching its nav link.

```jsx
// App.jsx — section order
<Hero />          // NOT lazy — above the fold, loads immediately
<MarqueeBar />    // NOT lazy — immediately below hero
<Suspense><About /></Suspense>
<Suspense><Services /></Suspense>
<Suspense><Skills /></Suspense>
<Suspense><Edu_Exp /></Suspense>   {/* Journey.jsx — also renders <Certifications /> inside */}
<Suspense><Projects /></Suspense>
<Suspense><Contact /></Suspense>
<Footer />
<ScrollToTop />
```

Each `Suspense` boundary falls back to a `Skeleton` component that renders animated pulse bars matching the section's approximate layout — 3 header bars + a 6-card grid. A "Skip to main content" link is rendered before the navbar for keyboard/screen-reader accessibility.

---

## Theme System — `ThemeContext.jsx`

`ThemeProvider` stores theme as `'dark' | 'light'` in `localStorage` under the `theme` key. On mount, it reads the saved value (defaults to `'dark'`). A `useEffect` applies `document.documentElement.setAttribute('data-theme', theme)` on every change and persists the value back to `localStorage`. All design tokens are CSS custom properties under `:root` (dark) and `[data-theme="light"]` (light). Toggling is a single `toggle()` function exposed via the `useTheme()` hook: `setTheme(t => t === 'dark' ? 'light' : 'dark')`.

### Design Tokens — CSS Custom Properties

Design tokens are declared once on `:root` (dark) and overridden in `[data-theme="light"]`:

| Token | Purpose |
|---|---|
| `--bg0` – `--bg4` | Layered background surfaces, darkest to lightest |
| `--text1` – `--text3` | Primary, secondary, and muted text colors |
| `--accent` / `--accent-h` | Brand indigo + its hover/highlight shade |
| `--accent-glow` | Soft glow color used in shadows and rings |
| `--green` | Success / availability accent |
| `--border` | Hairline border color |
| `--sh-d` / `--sh-l` | Dark and light shadow components |
| `--neu-out`, `--neu-out-sm`, `--neu-in`, `--neu-in-sm` | Pre-computed neumorphic box-shadow pairs |

Neumorphic shadows are pre-computed as CSS variables and applied via `style={{ boxShadow: "var(--neu-out)" }}` — making the entire card system theme-aware with zero JavaScript.

---

## Custom Hooks — `src/hooks/index.js`

4 custom hooks, shared across every section:

| Hook | Purpose | Implementation |
|---|---|---|
| `useActiveSection(sectionIds[])` | Currently active nav section ID | An `IntersectionObserver` per section (`rootMargin: "-80px 0px -35% 0px"`) combined with a passive scroll-fallback that measures distance-from-navbar to pick the closest section |
| `useScrollY()` | Current `window.scrollY` | Passive `scroll` listener, plain state update |
| `useScrollProgress()` | Scroll completion ratio 0–1 | `scrollY / (scrollHeight − innerHeight)` on a passive scroll listener |
| `useInViewOnce(ref, options?)` | One-shot "has this entered the viewport" boolean | Single `IntersectionObserver` that disconnects itself after the first intersection — mimics Framer Motion's `useInView(once: true)` without the dependency |

`useInViewOnce` powers the shared `Reveal` and `SectionHeader` components, so every section's scroll-reveal animation runs through the same primitive.

---

## Scroll Progress Bar

`ProgressBar` (defined inline in `App.jsx`) renders as a `fixed top-0 left-0 z-[300] h-[3px]` div. Width is `${p * 100}%` where `p` comes from `useScrollProgress()`. Background: `linear-gradient(90deg, var(--accent), var(--accent-h), var(--green))`. Box-shadow: `0 0 10px var(--accent-glow)`. Transition: `width 0.1s linear`.

---

## Navbar — `Navbar.jsx`

7 navigation links (Home, About, Services, Skills, Journey, Projects, Contact). Active section is tracked with `useActiveSection`. Scroll-aware background: `rgba(6,8,16,0.94)` (dark) / `rgba(220,226,235,0.94)` (light) with `backdrop-filter: blur(28px) saturate(2)` once `scrollY > 50`. The nav slides in on load via a `navSlideDown` keyframe. `smoothScroll(id)` offsets the scroll target by the navbar height and retries for up to 1.5s if the target section hasn't rendered yet (relevant for lazy-loaded sections). A theme toggle button (`FiSun` / `FiMoon`) and an animated mobile menu round out the component.

---

## Hero Section — `Hero.jsx`

### Typewriter

A local `useTypewriter(words, speed)` hook cycles through the 7 `phrases` exported from `data/index.js` — "Frontend Developer", "React.js Specialist", "UI/UX Enthusiast", "JavaScript Aficionado", "AI Tools Explorer", "Tailwind CSS Expert", "Open Source Contributor" — typing and deleting one character at a time via `setTimeout`.

### 3D Tilt + Spotlight

`onMouseMove` on the hero card is throttled through `requestAnimationFrame` before writing to the DOM:

```js
const dx = (x - rect.width / 2) / (rect.width / 2);
const dy = (y - rect.height / 2) / (rect.height / 2);
el.style.transform = `perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translate3d(0,0,0)`;
el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
```

`--mx` / `--my` drive a `.spotlight` overlay. `onMouseLeave` resets the transform to flat and cancels any pending animation frame.

### Content

Left column: an animated availability badge, name heading with a gradient span, the typewriter line with a blinking cursor, bio text, 2 CTA buttons (View Projects / Download CV via a Google Drive link), 3 stat pills (70+ Projects, 65+ Repositories, 25+ Technologies), and a row of 7 social icon links mapped from a `SOCIAL_ICONS` record. Right column: the tilting profile card with a conic-gradient glow ring and a name/role footer.

---

## MarqueeBar — `MarqueeBar.jsx`

14 tech stack items — React.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vite, Redux, MongoDB, GitHub, Firebase, JavaScript, CSS3, HTML5, Git — each paired with its `react-icons` glyph. The array is doubled (`[...SKILLS, ...SKILLS]`) and a `.marquee-track` keyframe animates `translateX(-50%)`, looping seamlessly once the doubled content scrolls halfway. Icon color: `var(--green)`; label style: small, bold, wide-tracked, muted text.

---

## Services Section — `Services.jsx`

5 services rendered in a responsive grid, the first as a wide "hero card" (`col-span-2`) with a large ghost numeral (`01`) and a hover-triggered radial glow in the service's accent color:

| Service | Focus |
|---|---|
| Web Development | Custom React.js + TypeScript apps |
| UI/UX Design | Figma-to-code, Framer Motion & GSAP micro-interactions |
| AI Integration | Claude AI, GitHub Copilot, v0 by Vercel, and other AI dev tools |
| Performance Audit | Bundle size, lazy loading, Core Web Vitals |
| Firebase & APIs | Auth, Firestore, REST API integration |

---

## Skills Section — `Skills.jsx`

6 skill category cards, each with a color-keyed top border, a neumorphic icon container, and a set of skill pills:

| Category | Icon | Skills |
|---|---|---|
| Frontend Core | 💻 | HTML5, CSS3, JavaScript (ES6+), TypeScript, Responsive Design, Web APIs |
| React Ecosystem | ⚛️ | React.js, React Router, React Hooks, Context API, Redux Toolkit, Custom Hooks |
| Styling & UI | 🎨 | Tailwind CSS v4, Framer Motion, GSAP, ShadCN UI, Material UI, Bootstrap, CSS Animations |
| Tools & Platforms | 🛠️ | Git, GitHub, VS Code, Vite, Webpack, npm, Vercel, Netlify |
| Backend & Services | 🔥 | Firebase Auth, Firestore, REST APIs, Axios |
| AI Dev Tools | 🤖 | Claude AI, Lovable.dev, Emergent, Replit, GitHub Copilot, Cursor AI, v0 by Vercel |

---

## Journey Section — `Journey.jsx`

A single section that replaces the old separate Experience/Education layout with a "scoreboard" toggle:

- **Scoreboard header** — two large tabular-number counters ("Degrees earned" / "Active roles") that switch the active panel between **Education** and **Experience** on click, each with its own animated underline indicator.
- **Education panel** — a vertical animated year-bar next to a stack of degree cards (`Reveal dir="r"`), each showing degree, school, location, period, grade, description, and tag pills. Certifications render directly beneath this panel.
- **Experience panel** — the same layout, revealing from the opposite direction (`Reveal dir="l"`), with a "Current" badge on active roles.

**Education (3 entries):**

1. Bachelor of Computer Applications (BCA) — MAHGU, 2022–2025, 8.03 CGPA
2. Intermediate (12th, PCM) — Rana Pratap Inter College, 2021–2022, 74%
3. High School (10th) — Guru Nanak Public School, 2019–2020, 79%

**Experience (2 entries):**

1. Frontend Developer — Personal Projects, 2025–Present (current)
2. Frontend Developer — Tripathi Dev Lab, 2025–Present (current)

---

## Certifications — `Certifications.jsx`

Rendered inside the Education panel of Journey. A responsive grid of cards (`cert-rv` reveal, staggered 60ms apart), each with a color-keyed glowing top border and a "View Certificate" link that opens in a new tab.

4 certifications:

1. JavaScript — The Complete Guide (CodeChef, 2024)
2. React.js (Simplilearn, 2026)
3. Front End Development (Simplilearn, 2026)
4. GitHub Copilot Fundamentals (Microsoft, 2026)

---

## Projects Section — `Projects.jsx`

A scroll-driven "stacked card" showcase rather than a static grid. Each project starts as a rotated, slightly scaled-down, semi-transparent card (`rotate(${rot}deg) scale(0.94)`, one of several preset rotation angles) and straightens into `rotate(0deg) scale(1)` with full opacity once it becomes sticky-locked at the top of the viewport, tracked via `IntersectionObserver` + `ResizeObserver`. As each card locks, `onActivate(project.color)` shifts an ambient background glow to match that project's accent color. Rotation angles are reduced on mobile for a subtler effect. Each card shows a project image, title, description, up to 4 tech pills, and Live/GitHub links styled in the project's accent color.

5 projects showcased:

1. Access Copilot — AI-powered web accessibility auditing tool
2. Nova Shop — e-commerce frontend with cart, filters, and auth
3. Doctor Appointment Booking App — Firebase auth + real-time Firestore
4. Color Palette Website — Supabase-backed palette generator and explorer
5. Nike Landing Page — pixel-perfect animated landing page

---

## Contact Section — `Contact.jsx`

### EmailJS Integration

`emailjs.send("service_bcj0gjg", "template_v8ol7lc", params, import.meta.env.VITE_EMAILJS_KEY)` sends real emails using a public key supplied via environment variable rather than hardcoded in source.

### Auto-Save Draft

Form state is debounced and saved to `localStorage` via `store.draft.save(f)` shortly after each keystroke. On mount, `store.draft.get()` restores any saved draft and shows a "💾 Draft restored" note for ~2.6 seconds. On successful submit, the draft is cleared.

### Form State Machine

`done` — replaces the form with a success confirmation. `busy` — disables the submit button and shows a loading state while the email sends. `err` — a per-field validation error map, cleared as the user corrects each field.

### Extras

The section includes decorative SVG noise and diagonal-line backgrounds, a cursor-tracking radial glow (`CursorGlow`), and a `StyledField` wrapper that adds a focus-triggered gradient underline and neumorphic depth to every input.

---

## `store.js` — localStorage Utility

Namespaced under a `'pt_'` prefix. Type-safe-in-spirit generic reads with `try/catch` fallbacks:

- `store.get(key, fallback)` — parsed JSON read, falls back safely on error
- `store.set(key, value)` — JSON-stringified write
- `store.rm(key)` — removes a key
- `store.draft.save(d)`, `store.draft.get()`, `store.draft.clear()` — contact form draft management

---

## Footer + ScrollToTop — `Footer.jsx`

Footer: brand name, bio, social icon row with per-icon hover color, quick nav links, and copyright.

`ScrollToTop`: visible only once `scrollY > 400`. A circular button at `fixed bottom-6 right-6` with an SVG progress ring driven by `useScrollProgress()` — the ring's `strokeDashoffset` fills in as the page scrolls, and the button fades/scales in with a keyframe animation.

---

## Data File — `src/data/index.js`

Central data module. All section content lives here and is imported by components — nothing is hardcoded in JSX:

| Export | Content |
|---|---|
| `personal` | Name, role, location, email, phone, bio, About bio, status |
| `Resume` | Google Drive link to resume PDF |
| `phrases` | 7 typewriter phrases |
| `socials` | 7 social links (name, icon, url, color) |
| `stats` | 3 hero stats |
| `skillCategories` | 6 categories, 41 total skills |
| `services` | 5 service offerings |
| `projects` | 5 projects (id, emoji, title, image, desc, tech[], github, live, color, featured) |
| `experience` | 2 experience entries |
| `education` | 3 education entries |
| `certifications` | 4 certification entries |

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19.2.7 | UI framework |
| React DOM | 19.2.7 | DOM renderer |
| Vite | 8.1.1 | Build tool, dev server |
| Tailwind CSS | 4.3.3 | Utility-first styling |
| @tailwindcss/vite | 4.3.3 | Vite plugin for Tailwind v4 |
| @emailjs/browser | 4.4.1 | Contact form email delivery (no backend) |
| react-icons | 5.7.0 | Icon set across the whole site |
| react-scroll | 1.9.3 | Footer nav smooth-scroll links |
| terser | 5.36.0 | Production JS minification |
| ESLint | 10.6.0 | Linting (with React Hooks + React Refresh plugins) |

---

## Performance & SEO

- **Code-split by route section** — every section below the hero is a `React.lazy` chunk, hydrated only when it enters the DOM via `Suspense`.
- **Manual vendor chunking** — `vite.config.js` splits `react`/`react-dom`, `react-icons`, and `@emailjs/browser` into dedicated vendor bundles so app code changes don't invalidate the framework cache.
- **Aggressive Terser config** — `drop_console`, `drop_debugger`, 2-pass compression, Safari 10-safe mangling.
- **Dependency pre-bundling** — `optimizeDeps.include` warms React, `react-icons/fa`, `react-icons/fi`, and `react-icons/si` ahead of time; `server.warmup` pre-transforms `main.jsx`, `App.jsx`, and `Hero.jsx` for a faster dev-server first paint.
- **Full metadata** — Open Graph and Twitter card tags, a canonical URL, a `theme-color` meta tag, `robots.txt`, `sitemap.xml`, and an `llms.txt` for LLM-based crawlers/search.
- **Accessible by default** — semantic landmarks, a "Skip to main content" link, `aria-label`s on icon-only controls, and `aria-live` on the typewriter text.

---

## Project Structure

```
portfolio/
├── index.html                       # Vite entry; SEO meta, OG/Twitter tags, canonical URL
├── vite.config.js                   # React + Tailwind v4 plugins; terser minification; manual vendor chunking
├── eslint.config.js                 # ESLint flat config — React Hooks + React Refresh rules
├── package.json / package-lock.json
├── .env                             # VITE_EMAILJS_KEY (gitignored)
├── .gitignore
│
├── public/
│   ├── projects/                    # Project preview images (accesscopilot, colorpalette, doctor, nike, novashop)
│   ├── favicon.png
│   ├── llms.txt                     # LLM-crawler friendly summary of the site
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── main.jsx                     # createRoot — mounts <App />
    ├── App.jsx                      # ThemeProvider wraps Inner; ProgressBar; Navbar; Hero + MarqueeBar (eager); 6 lazy Suspense sections; Footer + ScrollToTop
    ├── index.css                    # Tailwind v4; CSS custom property design tokens (dark + light); neumorphic shadow variables; marquee/reveal/scoreboard keyframes
    │
    ├── context/
    │   └── ThemeContext.jsx         # ThemeProvider — localStorage init, data-theme toggle, useTheme() hook
    │
    ├── data/
    │   └── index.js                 # All portfolio content: personal info, Resume link, phrases, socials, stats, skillCategories, services, projects, experience, education, certifications
    │
    ├── hooks/
    │   └── index.js                 # useActiveSection, useScrollY, useScrollProgress, useInViewOnce
    │
    ├── utils/
    │   └── store.js                 # localStorage utility — 'pt_' namespace; get/set/rm; draft.save/get/clear
    │
    ├── assets/
    │   ├── Hero.webp                # Profile photo (hero section)
    │   └── About.webp               # Profile photo (about section)
    │
    └── components/
        ├── layout/
        │   ├── Navbar.jsx           # 7 nav links; useActiveSection; smoothScroll(id) with retry; scroll-aware backdrop-blur; theme toggle; mobile menu
        │   └── Footer.jsx           # SocialIcon (hover color); ScrollToTop (SVG progress ring); react-scroll nav links; copyright
        │
        ├── ui/
        │   ├── MarqueeBar.jsx       # 14 tech icons doubled for seamless loop
        │   ├── Reveal.jsx           # Shared IntersectionObserver-based reveal wrapper (dir, delay props)
        │   └── SectionHeader.jsx    # Shared eyebrow + title + subtitle header with its own reveal animation
        │
        └── sections/
            ├── Hero.jsx             # Local useTypewriter; RAF-throttled 3D tilt; conic glow ring; spotlight; stats; social icons; CTAs
            ├── About.jsx            # Bio + image card, tilt/spotlight system shared with Hero
            ├── Services.jsx         # 5-service grid with a wide hero card and hover glow
            ├── Skills.jsx           # 6 skill category cards with pills
            ├── Journey.jsx          # Scoreboard tab switch between Education and Experience timelines; renders <Certifications />
            ├── Certifications.jsx   # Credential cards with "View Certificate" links
            ├── Projects.jsx         # Scroll-driven sticky, rotated project cards with ambient color glow
            └── Contact.jsx          # emailjs.send() via env key; draft auto-save/restore; validated form; done/busy/note states
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An EmailJS account (service ID, template ID, public key) for the contact form

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tripathipawan/My-Personal-Portfolio.git
cd My-Personal-Portfolio

# 2. Install dependencies
npm install

# 3. Configure EmailJS
# Create a .env file in the project root:
echo "VITE_EMAILJS_KEY=your_public_key_here" > .env
# Then update the service ID and template ID in
# src/components/sections/Contact.jsx (emailjs.send call)

# 4. Start the development server
npm run dev
# App runs at http://localhost:5173
```

### Build

```bash
npm run build     # vite build (with terser minification + manual vendor chunking)
npm run preview   # Preview the production build
npm run lint       # Run ESLint
```

---

## Repository

[https://github.com/tripathipawan/My-Personal-Portfolio](https://github.com/tripathipawan/My-Personal-Portfolio)

## Live Site

[https://pawantripathi.vercel.app](https://pawantripathi.vercel.app)
