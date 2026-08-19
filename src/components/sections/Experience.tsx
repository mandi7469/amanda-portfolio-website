import { SupportingProjects } from "@/components/sections/SupportingProjects";
import { GlassSection } from "@/components/ui/GlassSection";
import { experience } from "@/data/portfolio";

const primaryExperience = experience.filter((item) => item.primary);

export function Experience() {
  return (
    <GlassSection id="experience" title="Professional Experience" className="experience-section">
      <div className="timeline experience-rows" aria-label="Development experience timeline">
        {primaryExperience.map((item, index) => (
          <article className="timeline-entry experience-row" key={`${item.period}-${item.title}`}>
            <p className="timeline-period">{item.period}</p>
            <div className="timeline-content">
              <span className="timeline-node" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p className="timeline-organization">
                {item.organization}{item.location ? ` · ${item.location}` : ""}
              </p>
              {item.summary ? <p>{item.summary}</p> : null}
            </div>
            {index === 0 ? <SupportingProjects /> : null}
          </article>
        ))}

      </div>
    </GlassSection>
  );
}
