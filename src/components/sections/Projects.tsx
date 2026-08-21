import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { GlassSection } from "@/components/ui/GlassSection";
import { projects } from "@/data/portfolio";

const featuredProjects = projects.filter((project) => project.featured);

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={siGithub.path} fill="currentColor" />
    </svg>
  );
}

export function Projects() {
  return (
    <GlassSection id="projects" title="Featured Projects" className="projects-section">
      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <article className="project-card project-card-featured" key={project.title}>
            <div className="project-media">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
            <div className="project-copy">
              <p className="project-role">{project.role}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.technologies ? (
                <ul className="technology-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              ) : null}
              <div className="project-links">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  View project <ArrowUpRight aria-hidden="true" strokeWidth={2.5} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View repo <GitHubIcon />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </GlassSection>
  );
}
