export type SkillGroup = {
  title: string;
  items: readonly string[];
  size: "small" | "medium" | "wide";
};

export type Project = {
  title: string;
  role: string;
  description?: string;
  image: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl?: string;
  technologies?: readonly string[];
  featured: boolean;
};

export type Experience = {
  period: string;
  title: string;
  organization: string;
  location?: string;
  summary?: string;
  primary: boolean;
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
    size: "small",
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "React Router", "Vite", "Material UI", "Bootstrap"],
    size: "medium",
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Next.js API Routes", "PostgreSQL", "MongoDB"],
    size: "medium",
  },
  {
    title: "Testing & Tools",
    items: ["Playwright", "Vitest", "React Testing Library", "ESLint", "Git", "GitHub", "Hostinger", "WordPress"],
    size: "wide",
  },
  {
    title: "AI-Assisted Development",
    items: ["OpenAI Codex", "ChatGPT", "GitHub Copilot"],
    size: "wide",
  },
] as const;

export const projects: readonly Project[] = [
  {
    title: "Recipe Vault",
    role: "Independent",
    description:
      "Full-stack recipe manager with public browsing, search and filters, secure authentication, and user-owned recipe creation, editing, and deletion.",
    image: "/projects/recipe-vault.png",
    imageAlt: "Recipe Vault recipe list displayed on a laptop",
    liveUrl: "https://recipe-vault-ten.vercel.app/",
    githubUrl: "https://github.com/mandi7469/recipe-vault",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Auth.js"],
    featured: true,
  },
  {
    title: "Fairway Favorites",
    role: "Independent",
    description:
      "Disc golf companion for searching and saving discs, playing a hangman game, tracking rounds, exploring courses, and storing shot videos.",
    image: "/projects/fairway-favorites.png",
    imageAlt: "Fairway Favorites disc search displayed on a laptop",
    liveUrl: "https://fairway-favorites.netlify.app/",
    githubUrl: "https://github.com/mandi7469/Fairway-Favorites",
    technologies: ["React", "Vite", "JavaScript", "React Router", "localForage"],
    featured: true,
  },
  {
    title: "Cosmic Quest",
    role: "Collaborative",
    description:
      "Collaborative MERN text adventure where player choices drive a mission to find the lost Elysium and the Cosmic Heart.",
    image: "/projects/cosmic-quest.png",
    imageAlt: "Cosmic Quest login interface displayed on a laptop",
    liveUrl: "https://cosmic-quest.onrender.com/",
    githubUrl: "https://github.com/mandi7469/Cosmic-Quest",
    technologies: ["MongoDB", "Express", "React", "Node.js", "REST APIs"],
    featured: true,
  },
  {
    title: "BuildMyIO",
    role: "Freelance Website",
    image: "/projects/buildmyio.webp",
    imageAlt: "BuildMyIO website",
    liveUrl: "https://buildmyio.com/",
    featured: false,
  },
  {
    title: "Northstar Contract Supplies",
    role: "Freelance Website",
    image: "/projects/northstar-contract-supplies.webp",
    imageAlt: "Northstar Contract Supplies website",
    liveUrl: "https://nscontractsupplies.com/",
    featured: false,
  },
  {
    title: "Horizon Energy",
    role: "Freelance Website",
    image: "/projects/horizon-energy.webp",
    imageAlt: "Horizon Energy website",
    liveUrl: "https://hrzeng.com/",
    featured: false,
  },
  {
    title: "West Coast Electric Sales",
    role: "Freelance Website",
    image: "/projects/west-coast-electric-sales.webp",
    imageAlt: "West Coast Electric Sales website",
    liveUrl: "https://wcelectricsales.com/",
    featured: false,
  },
] as const;

export const experience: readonly Experience[] = [
  {
    period: "Jun 2025 – Present",
    title: "Freelance Web Developer & Product Designer",
    organization: "Independent",
    location: "Remote",
    summary:
      "Designing, building, testing, deploying, and maintaining production websites with responsive UI systems, contact workflows, hosting, DNS, SSL, and AI-assisted development practices.",
    primary: true,
  },
  {
    period: "Apr 2026 – Jun 2026",
    title: "Frontend Developer / UI Contributor",
    organization: "League Copilot",
    location: "Remote",
    summary:
      "Refined React and TypeScript interfaces, reusable accessible modals, mobile navigation, responsive layouts, theme contrast, and Vitest contract coverage.",
    primary: true,
  },
  {
    period: "2022 – 2024",
    title: "Credentialing Specialist",
    organization: "American Traveler Staffing Professionals",
    primary: false,
  },
  {
    period: "2021 – 2022",
    title: "Legal Assistant",
    organization: "Minerley Fein P.A.",
    primary: false,
  },
  {
    period: "2018 – 2020",
    title: "Account Manager",
    organization: "Helbing Law Group",
    primary: false,
  },
] as const;
