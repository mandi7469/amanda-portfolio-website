import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

const supportingProjects = projects.filter((project) => !project.featured);

export function SupportingProjects() {
  return (
    <div
      className="supporting-projects experience-projects"
      aria-label="Freelance website projects"
    >
      {supportingProjects.map((project) => (
        <a
          className="project-card project-card-supporting"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          key={project.title}
        >
          <span className="supporting-media">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 760px) 100vw, 25vw"
            />
          </span>
          <span className="supporting-copy">
            <strong>{project.title}</strong>
            <span>{project.role}</span>
          </span>
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">Open project in a new tab</span>
        </a>
      ))}
    </div>
  );
}
