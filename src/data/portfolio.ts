export type SkillGroup = {
  title: string;
  items: readonly string[];
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
  experienceTitle?: string;
};

export type Experience = {
  period: string;
  title: string;
  organization: string;
  location?: string;
  highlights?: readonly string[];
  projectsLabel?: string;
  projectsHeading?: string;
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
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "React Router", "Vite", "Material UI", "Bootstrap"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Next.js API Routes", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Testing & Tools",
    items: ["Playwright", "Vitest", "React Testing Library", "ESLint", "Git", "GitHub", "Hostinger", "WordPress"],
  },
  {
    title: "AI-Assisted Development",
    items: ["OpenAI Codex", "ChatGPT", "GitHub Copilot"],
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
    image: "/projects/buildmyio.png",
    imageAlt: "BuildMyIO website",
    liveUrl: "https://buildmyio.com/",
    featured: false,
    experienceTitle: "Freelance Web Developer & Product Designer",
  },
  {
    title: "Northstar Contract Supplies",
    role: "Freelance Website",
    image: "/projects/northstar.png",
    imageAlt: "Northstar Contract Supplies website",
    liveUrl: "https://nscontractsupplies.com/",
    featured: false,
    experienceTitle: "Freelance Web Developer & Product Designer",
  },
  {
    title: "Horizon Energy",
    role: "Freelance Website",
    image: "/projects/horizonenergy-16x10.png",
    imageAlt: "Horizon Energy website",
    liveUrl: "https://hrzeng.com/",
    featured: false,
    experienceTitle: "Freelance Web Developer & Product Designer",
  },
  {
    title: "West Coast Electric Sales",
    role: "Freelance Website",
    image: "/projects/westcoast.png",
    imageAlt: "West Coast Electric Sales website",
    liveUrl: "https://wcelectricsales.com/",
    featured: false,
    experienceTitle: "Freelance Web Developer & Product Designer",
  },
  {
    title: "League Copilot",
    role: "Product Website",
    image: "/projects/leaguecopilot-16x10.png",
    imageAlt: "League Copilot website",
    liveUrl: "https://league-copilot.com/",
    featured: false,
    experienceTitle: "Frontend Developer / UI Contributor",
  },
] as const;

export const experience: readonly Experience[] = [
  {
    period: "Jun 2025 – Present",
    title: "Freelance Web Developer & Product Designer",
    organization: "Independent",
    location: "Remote",
    highlights: [
      "Designed, built, and deployed four production websites for engineering, electrical equipment, medical supply, and software services organizations using React, Next.js, TypeScript, Tailwind CSS, Vite, and WordPress.",
      "Implemented reusable components, responsive layouts, interface animations, structured content, validated contact APIs, email-delivery workflows, and user-facing error handling.",
      "Created Horizon Energy's original WordPress/Elementor website, then rebuilt and refactored it as a React/Vite application using the approved WordPress design and content as the reference.",
      "Managed Hostinger hosting and domain-connected launches, including DNS, SSL, environment configuration, production deployment, updates, and post-launch support.",
      "Applied Codex and ChatGPT to requirements analysis, implementation planning, debugging, testing, and documentation while retaining ownership of code review, validation, and delivery.",
    ],
    projectsLabel: "Freelance website projects",
    projectsHeading: "Selected work:",
    primary: true,
  },
  {
    period: "Apr 2026 – Jun 2026",
    title: "Frontend Developer / UI Contributor",
    organization: "League Copilot",
    location: "Remote",
    highlights: [
      "Developed and refined responsive React/TypeScript interfaces across dashboards, statistics, standings, schedules, Commissioner Tools, league settings, and team-administration workflows.",
      "Standardized complex overlays through reusable, accessible modal components and improved mobile navigation, responsive layouts, light/dark theme contrast, and interaction states.",
      "Added and maintained Vitest contract tests to protect frontend component structure, responsive behavior, modal usage, navigation, and interaction states.",
    ],
    projectsLabel: "League Copilot project",
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
