const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Amanda Changa",
  title: "Amanda Changa | Frontend & Full-Stack Developer",
  description:
    "Frontend and full-stack developer building responsive production websites and web applications with React, Next.js, TypeScript, Node.js, and AI-assisted development workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
  email: "amandachanga7@gmail.com",
  github: "https://github.com/mandi7469",
  linkedin: "https://www.linkedin.com/in/amanda-changa",
  resume: "/resume/Amanda-Changa-Resume.pdf",
} as const;
