import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

type SupportingProjectsProps = {
  experienceTitle: string;
  ariaLabel: string;
  heading?: string;
};

export function SupportingProjects({
  experienceTitle,
  ariaLabel,
  heading,
}: SupportingProjectsProps) {
  const supportingProjects = projects.filter(
    (project) => !project.featured && project.experienceTitle === experienceTitle,
  );

  return (
    <>
      {heading ? <h4 className="supporting-projects-heading">{heading}</h4> : null}
      <div
        className="supporting-projects experience-projects"
        aria-label={ariaLabel}
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
            </span>
            <ArrowUpRight aria-hidden="true" strokeWidth={2.5} />
            <span className="sr-only">Open project in a new tab</span>
          </a>
        ))}
      </div>
    </>
  );
}
