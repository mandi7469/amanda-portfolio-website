import { SupportingProjects } from "@/components/sections/SupportingProjects";
import { GlassSection } from "@/components/ui/GlassSection";
import { experience } from "@/data/portfolio";

const primaryExperience = experience.filter((item) => item.primary);

export function Experience() {
  return (
    <GlassSection id="experience" title="Professional Experience" className="experience-section">
      <div className="timeline experience-rows" aria-label="Development experience timeline">
        {primaryExperience.map((item) => (
          <article className="timeline-entry experience-row" key={`${item.period}-${item.title}`}>
            <p className="timeline-period">{item.period}</p>
            <div className="timeline-content">
              <span className="timeline-node" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p className="timeline-organization">
                {item.organization}{item.location ? ` · ${item.location}` : ""}
              </p>
              {item.highlights ? (
                <ul className="timeline-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            {item.projectsLabel ? (
              <SupportingProjects
                experienceTitle={item.title}
                ariaLabel={item.projectsLabel}
                heading={item.projectsHeading}
              />
            ) : null}
          </article>
        ))}

      </div>
    </GlassSection>
  );
}
