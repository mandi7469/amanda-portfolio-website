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
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "React Router", "Vite", "Material UI", "Bootstrap"],
    size: "medium",
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "HTML", "CSS"],
    size: "small",
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
    title: "League Copilot",
    role: "Frontend Developer / UI Contributor",
    description:
      "Responsive React/TypeScript interfaces across dashboards, navigation, settings, and accessible modal workflows.",
    image: "/projects/league-copilot.webp",
    imageAlt: "League Copilot website interface",
    liveUrl: "https://league-copilot.com",
    technologies: ["React", "TypeScript", "Vitest"],
    featured: true,
  },
  {
    title: "Recipe Vault",
    role: "Full-Stack Developer",
    description: "Recipe-management application for browsing, searching, and managing recipes.",
    image: "/projects/recipe-vault.webp",
    imageAlt: "Recipe Vault application interface",
    liveUrl: "https://recipe-vault-ten.vercel.app",
    githubUrl: "https://github.com/mandi7469/recipe-vault",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
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

export const education = [
  {
    school: "University of Central Florida",
    credential: "Certificate, Full-Stack Web Development",
    year: "2024",
  },
  {
    school: "Barry University",
    credential: "Bachelor of Arts with a major in Photography",
    year: "2017",
  },
] as const;
