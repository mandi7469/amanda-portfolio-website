import { CodeXml, Drama, FolderCog, type LucideIcon } from "lucide-react";
import {
  siBootstrap,
  siCss,
  siEslint,
  siExpress,
  siGit,
  siGithub,
  siGithubcopilot,
  siGraphql,
  siHostinger,
  siHtml5,
  siJavascript,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siReactrouter,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVite,
  siVitest,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

const brandIcons: Record<string, SimpleIcon> = {
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "React Router": siReactrouter,
  Vite: siVite,
  "Material UI": siMui,
  Bootstrap: siBootstrap,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  GraphQL: siGraphql,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Vitest: siVitest,
  "React Testing Library": siTestinglibrary,
  ESLint: siEslint,
  Git: siGit,
  GitHub: siGithub,
  Hostinger: siHostinger,
  WordPress: siWordpress,
  "GitHub Copilot": siGithubcopilot,
};

const customImageIcons: Record<string, { src: string; size: number }> = {
  "REST APIs": { src: "/images/rest-api-icon.png", size: 100 },
  "OpenAI Codex": { src: "/images/openai-codex-icon.png", size: 512 },
  ChatGPT: { src: "/images/chatgpt-icon.png", size: 96 },
};

const conceptIcons: Record<string, LucideIcon> = {
  "Next.js API Routes": FolderCog,
  Playwright: Drama,
};

export function SkillIcon({ name }: { name: string }) {
  const brandIcon = brandIcons[name];

  if (brandIcon) {
    return (
      <svg className="skill-bubble-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={brandIcon.path} fill="currentColor" />
      </svg>
    );
  }

  const customImageIcon = customImageIcons[name];

  if (customImageIcon) {
    return (
      <svg
        className="skill-bubble-svg"
        viewBox={`0 0 ${customImageIcon.size} ${customImageIcon.size}`}
        aria-hidden="true"
        focusable="false"
      >
        <image
          href={customImageIcon.src}
          width={customImageIcon.size}
          height={customImageIcon.size}
        />
      </svg>
    );
  }

  const ConceptIcon = conceptIcons[name] ?? CodeXml;
  return <ConceptIcon className="skill-bubble-svg" aria-hidden="true" strokeWidth={1.8} />;
}
