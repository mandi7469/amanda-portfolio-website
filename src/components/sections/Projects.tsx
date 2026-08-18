import Image from "next/image";
import { ArrowUpRight, Code2 } from "lucide-react";
import { GlassSection } from "@/components/ui/GlassSection";
import { projects } from "@/data/portfolio";

const featuredProjects = projects.filter((project) => project.featured);

export function Projects() {
  return (
    <GlassSection id="projects" title="Featured Projects">
      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <article className="project-card project-card-featured" key={project.title}>
            <div className="project-media">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
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
                  View project <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View code <Code2 aria-hidden="true" />
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
