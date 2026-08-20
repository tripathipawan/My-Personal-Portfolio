export const personal = {
  name: "Pawan Tripathi",
  Status: "Available",
  role: "Frontend Developer",
  location: "Uttarakhand, India",
  email: "tripathipawan8705@gmail.com",
  phone: "+91 9557673455",
  bio: "Passionate Frontend Developer crafting pixel-perfect, high-performance web applications. I blend clean code with creative design — turning complex ideas into seamless digital experiences.",
  Aboutbio: "I'm Pawan Tripathi, a passionate Frontend Developer from Uttarakhand, India, currently pursuing my BCA at MAHGU. I specialize in building responsive, pixel-perfect web applications using React.js, TypeScript, and Tailwind CSS. With 75+ projects and a strong eye for UI/UX, I blend clean code with creative design to craft seamless digital experiences. Beyond coding, I run Tripathi Dev Lab — a YouTube channel where I share web dev tutorials and insights with the developer community. I'm always exploring the latest in frontend tech, AI dev tools, and open-source — and I'm currently open to freelance projects and exciting opportunities.",
  status: "Open to Opportunities",
}

export const Resume = {
  link: "https://drive.google.com/file/d/1t-Me_3FFaOjPpR_aiIB7PByPl1C3Sl8Q/view?usp=drivesdk",
}

export const phrases = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "JavaScript Aficionado",
  "AI Tools Explorer",
  "Tailwind CSS Expert",
  "Open Source Contributor",
]

export const socials = [
  { name: "GitHub", icon: "FaGithub", url: "https://github.com/tripathipawan", color: "#939393" },
  { name: "LinkedIn", icon: "FaLinkedin", url: "https://www.linkedin.com/in/pawantripathi", color: "#0A66C2" },
  { name: "YouTube", icon: "FaYoutube", url: "https://youtube.com/@tripathidevlab", color: "#FF0000" },
  { name: "Instagram", icon: "FaInstagram", url: "https://www.instagram.com/tripathidevlab", color: "#E1306C" },
  { name: "Leetcode", icon: "SiLeetcode", url: "https://leetcode.com/u/hK10OqCKbH/", color: "#aaaaaa" },
  { name: "WhatsApp", icon: "FaWhatsapp", url: "https://whatsapp.com/channel/0029Vb7sg2V3bbV4NpadBX1m", color: "#25D366" },
  { name: "FaceBook", icon: "FaFacebook", url: "https://www.facebook.com/profile.php?id=61572586097410", color: "#1877F2" },
]

export const stats = [
  { value: "70+", label: "Projects" },
  { value: "65+", label: "Repositories" },
  { value: "25+", label: "Technologies" },
  { value: "5K+", label: "Newsletter Subs" },
]

export const skillCategories = [
  {
    cat: "Frontend Core", icon: "💻", color: "#6366f1",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Responsive Design", "Web APIs"],
  },
  {
    cat: "React Ecosystem", icon: "⚛️", color: "#38bdf8",
    skills: ["React.js", "React Router", "React Hooks", "Context API", "Redux Toolkit", "Custom Hooks"],
  },
  {
    cat: "Styling & UI", icon: "🎨", color: "#10d9a0",
    skills: ["Tailwind CSS v4", "SCSS/SASS", "Framer Motion", "GSAP", "ShadCN UI", "Material UI", "Bootstrap", "CSS Animations"],
  },
  {
    cat: "Tools & Platforms", icon: "🛠️", color: "#f59e0b",
    skills: ["Git", "GitHub", "VS Code", "Vite", "Webpack", "npm", "Vercel", "Netlify"],
  },
  {
    cat: "Backend & Services", icon: "🔥", color: "#f472b6",
    skills: ["Firebase Auth", "Firestore", "REST APIs", "Axios"],
  },
  {
    cat: "AI Dev Tools", icon: "🤖", color: "#a78bfa",
    skills: ["Claude AI", "Lovable.dev", "Emergent", "Replit", "GitHub Copilot", "Cursor AI", "v0 by Vercel"],
  },
]

export const projects = [
  {
    id: 1, emoji: "🤖", title: "Access Copilot", featured: true,
    image: "/projects/accesscopilot.webp",
    desc: "AccessCopilot is an AI-powered web accessibility auditing tool.",
    tech: ["TypeScript", "Redux Toolkit + Redux Persist", "React.js", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
    github: "https://github.com/tripathipawan/Accessibility_Copilot",
    live: "https://accesscopilot.vercel.app/",
    color: "#7510ff",
  },
  {
    id: 2, emoji: "🛍️", title: "Nova Shop", featured: true,
    image: "/projects/novashop.webp",
    desc: "Modern e-commerce frontend with product listings, cart management, filter and sleek responsive design.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Context API", "Axios", "Lucide Icons", "Framer Motion", "Slick-carousel", "Clerk"],
    github: "https://github.com/tripathipawan/Nova_Shop/",
    live: "https://knovashop.vercel.app/",
    color: "#f59e0b",
  },
  {
    id: 3, emoji: "🏥", title: "Doctor Appointment Booking App", featured: true,
    image: "/projects/doctor.webp",
    desc: "Doctor appointment booking with Firebase auth, real-time Firestore, light/dark mode, and fully responsive UI.",
    tech: ["JavaScript", "React.js", "Firebase", "Tailwind CSS", "Firestore", "Lucide Icons"],
    github: "https://github.com/tripathipawan/Doctor_Booking_App",
    live: "https://appoint-your-doctor.vercel.app/",
    color: "#7510ff",
  },
  {
    id: 4, emoji: "🌈", title: "Color Palette website", featured: false,
    image: "/projects/colorpalette.webp",
    desc: "A color palette generator and explorer built with Supabase — browse, save, and share beautiful color combinations.",
    tech: ["Supabase", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    github: "https://github.com/tripathipawan/Color_Picker_Website",
    live: "https://paletteflow-studio.vercel.app/",
    color: "#f43f1e",
  },
  {
    id: 5, emoji: "🌈", title: "SagaCSS", featured: false,
    image: "/projects/sagacss.webp",
    desc: "SagaCSS is a free, all-in-one visual CSS toolkit for frontend developers. Instead of memorizing syntax for gradients, box-shadows, clip-paths, cubic-bezier curves, or CSS Grid, you design everything visually with live sliders and previews — and the tool generates clean, copy-ready code for you in CSS, Tailwind, and Bootstrap formats.",
    tech: ["TanStack Query", "React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "	shadcn/ui"],
    github: "https://github.com/tripathipawan/Saga_CSS_Website",
    live: "https://sagacss.vercel.app/",
    color: "#E1306C",
  },
  {
    id: 6, emoji: "👟", title: "Nike Landing Page", featured: false,
    image: "/projects/nike.webp",
    desc: "Pixel-perfect Nike landing page with smooth animations and premium feel showcasing advanced Tailwind.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    github: "https://github.com/tripathipawan/Nike",
    live: "https://nike-eta-beryl.vercel.app/",
    color: "#f59e0b",
  }
]

export const experience = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Personal Projects",
    period: "2025 – Present",
    type: "Self-Initiative",
    current: true,
    desc: 'Building and maintaining personal projects, including web apps, UI components, and open-source contributions.',
    tags: ["JavaScript", "TypeScript", "React.js", "Firebase", "REST APIs", "Tailwind CSS", "Framer Motion", "GSAP", "Bootstrap", "Material UI", "ShadCN UI"],
  }, {
    id: 2,
    role: "Frontend Developer",
    company: "Tripathi Dev Lab",
    period: "2025 – Present",
    type: "Self-Initiative",
    current: true,
    desc: 'Running "Tripathi Dev Lab" — building full-featured web apps, sharing knowledge on YouTube, growing developer community.',
    tags: ["JavaScript", "TypeScript", "React.js", "GSAP", "Framer Motion", "AI Tools"],
  },
]

export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Maharaja Agrasen Himalayan Garhwal University (MAHGU)",
    loc: "Uttarakhand, India",
    period: "2022 – 2025",
    desc: "Bachelor of Computer Applications with a strong foundation in programming, data structures, web dev, and software engineering.",
    tags: ["Data Structures", "Python", "Web Dev", "OOPs", "Software Engineering"],
    grade: "8.03 CGPA",
  },
  {
    id: 2,
    degree: "Intermediate (12th) — PCM",
    school: "Rana Pratap Inter College (U.K Board)",
    loc: "Uttarakhand, India",
    period: "2021 – 2022",
    desc: "Completed Class 12 (PCM) with a strong foundation in mathematics, logical reasoning, and problem-solving.",
    tags: ["Physics", "Chemistry", "Mathematics"],
    grade: "74%",
  },
  {
    id: 3,
    degree: "High School (10th) — Mathematics",
    school: "Guru Nanak Public School (U.K Board)",
    loc: "Uttarakhand, India",
    period: "2019 – 2020",
    desc: "Completed Class 10 with Mathematics, building a strong base in numerical and logical thinking.",
    tags: ["Mathematics", "Science", "English", "Social Science",],
    grade: "79%",
  },
]

export const certifications = [
  {
    id: 1,
    name: "JavaScript — The Complete Guide",
    platform: "CodeChef",
    year: "2024",
    color: "#f59e0b",
    icon: "🏅",
    URL: "https://www.codechef.com/certificates/public/5292983",
  },
  {
    id: 3,
    name: "React.Js ",
    platform: "Simplilearn",
    year: "2026",
    color: "#f43f5e",
    icon: "🏅",
    URL: "https://simpli-web.app.link/e/6HuscrCV03b",
  },
  {
    id: 4,
    name: "Front End Development",
    platform: "Simplilearn",
    year: "2026",
    color: "#38bdf8",
    icon: "🏅",
    URL: "https://simpli-web.app.link/e/5z6MY9nI33b",
  },
  {
    id: 2,
    name: "Github Copilot Fundamentals",
    platform: "Microsoft",
    year: "2026",
    color: "#f59e0b",
    icon: "🏅",
    URL: "https://simpli-web.app.link/e/gUKkBxqI33b",
  },
]

// ─── Services ────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    icon: "🌐",
    title: "Web Development",
    shortDesc: "Custom React.js apps",
    desc: "Production-ready React.js + TypeScript applications built from scratch — responsive, performant, and pixel-perfect across all devices.",
    color: "#6366f1",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Vite"],
    available: true,
  },
  {
    id: 2,
    icon: "🎨",
    title: "UI/UX Design",
    shortDesc: "Figma to code",
    desc: "Translating Figma designs into smooth, animated interfaces using Framer Motion & GSAP — every micro-interaction crafted with care.",
    color: "#10d9a0",
    tags: ["Figma", "Framer Motion", "GSAP", "ShadCN UI"],
    available: true,
  },
  {
    id: 3,
    icon: "🤖",
    title: "AI Integration",
    shortDesc: "Smarter apps with AI",
    desc: "Integrating Claude AI, GitHub Copilot, v0 by Vercel & modern AI tools to build smarter features and accelerate development.",
    color: "#f59e0b",
    tags: ["Claude AI", "Copilot", "v0 by Vercel", "Bolt.new"],
    available: true,
  },
  {
    id: 4,
    icon: "⚡",
    title: "Performance Audit",
    shortDesc: "Speed & Core Vitals",
    desc: "Auditing and optimizing existing web apps — bundle size reduction, lazy loading, Core Web Vitals improvements for lightning-fast UX.",
    color: "#f472b6",
    tags: ["Lighthouse", "Web Vitals", "Code Splitting", "Optimization"],
    available: true,
  },
  {
    id: 5,
    icon: "🔥",
    title: "Firebase & APIs",
    shortDesc: "Auth, DB & REST",
    desc: "Full frontend + backend integration — Firebase Auth, Firestore real-time DB, and REST API wiring for production-ready apps.",
    color: "#38bdf8",
    tags: ["Firebase", "Firestore", "REST APIs", "Axios"],
    available: true,
  },
  {
    id: 6,
    icon: "🧩",
    title: "State Management",
    shortDesc: "Redux Toolkit & Context",
    desc: "Architecting predictable, scalable app state using Redux Toolkit, Redux Persist & Context API — built for complex, data-heavy React apps.",
    color: "#a78bfa",
    tags: ["Redux Toolkit", "Redux Persist", "Context API", "Custom Hooks"],
    available: true,
  },
  {
    id: 7,
    icon: "♿",
    title: "Accessibility Audits",
    shortDesc: "WCAG-compliant apps",
    desc: "Auditing and fixing accessibility gaps — keyboard navigation, ARIA labels, color contrast & screen-reader support — so every user can use your product.",
    color: "#34d399",
    tags: ["WCAG", "ARIA", "Screen Readers", "a11y"],
    available: true,
  },
  {
    id: 8,
    icon: "✨",
    title: "Animation & Interactions",
    shortDesc: "GSAP + Framer Motion",
    desc: "Crafting scroll-triggered reveals, smooth page transitions & delightful micro-interactions that make interfaces feel alive, not just functional.",
    color: "#fb923c",
    tags: ["GSAP", "Framer Motion", "Scroll Animations", "Micro-interactions"],
    available: true,
  },
  {
    id: 9,
    icon: "✍️",
    title: "Technical Writing",
    shortDesc: "Tutorials & dev articles",
    desc: "Writing in-depth frontend tutorials and dev breakdowns — the same content I publish on my LinkedIn newsletter to 5,000+ subscribers and on Tripathi Dev Lab.",
    color: "#22d3ee",
    tags: ["LinkedIn Newsletter", "Tech Articles", "Tutorials", "Content Strategy"],
    available: true,
  },
  {
    id: 10,
    icon: "🛒",
    title: "E-commerce & Booking Apps",
    shortDesc: "Cart, checkout & scheduling",
    desc: "Building end-to-end e-commerce and appointment-booking flows — product catalogs, cart & checkout, auth, and real-time scheduling with Firestore.",
    color: "#eab308",
    tags: ["Clerk", "Firestore", "Cart & Checkout", "Booking Flows"],
    available: true,
  },
]

export const newsletter = {
  platform: "LinkedIn Newsletter",
  name: "Code, Context & AI",
  subscribers: "5,000+",
  followUrl: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7483395366604800000",
  groupUrl: "https://www.linkedin.com/groups/38780051/",
  tagline: "In-depth AI & frontend engineering breakdowns, read by 5,375+ developers.",
  articles: [
    {
      title: "AI Agents Explained Simply",
      desc: "A simple breakdown of how AI moves from just answering questions to actually planning and taking action.",
      url: "https://www.linkedin.com/pulse/ai-agents-explained-simply-pawan-tripathi-qw1ic/",
      tag: "AI Agents",
    },
    {
      title: "Why RAG Changed Everything",
      desc: "How Retrieval-Augmented Generation made AI systems smarter and more accurate, and why it became a core building block.",
      url: "https://www.linkedin.com/pulse/why-rag-changed-everything-pawan-tripathi-q6yoc/",
      tag: "RAG",
    },
    {
      title: "Why Most AI Apps Fail: They Have Intelligence But No Context",
      desc: "Why raw model intelligence isn't enough — and how context engineering separates AI apps that actually work from ones that don't.",
      url: "https://www.linkedin.com/pulse/why-most-ai-apps-fail-have-intelligence-context-pawan-tripathi-focqc/",
      tag: "AI Systems",
    },
    {
      title: "Prompt Engineering vs. Context Engineering: Which Skill Actually Matters in 2026?",
      desc: "Breaking down the two skills every AI builder needs, and why one of them is quietly becoming more valuable than the other.",
      url: "https://www.linkedin.com/pulse/prompt-engineering-vs-context-which-skill-actually-matters-tripathi-othkc/",
      tag: "AI Skills",
    },
  ],
}