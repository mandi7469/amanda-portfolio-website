import { SupportingProjects } from "@/components/sections/SupportingProjects";
import { GlassSection } from "@/components/ui/GlassSection";
import { education, experience } from "@/data/portfolio";

const primaryExperience = experience.filter((item) => item.primary);
const earlierExperience = experience.filter((item) => !item.primary);

export function Experience() {
  return (
    <GlassSection id="experience" title="Experience">
      <div className="experience-layout">
        <div className="timeline" aria-label="Development experience timeline">
          {primaryExperience.map((item) => (
            <article className="timeline-entry" key={`${item.period}-${item.title}`}>
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-content">
                <span className="timeline-node" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p className="timeline-organization">
                  {item.organization}{item.location ? ` · ${item.location}` : ""}
                </p>
                {item.summary ? <p>{item.summary}</p> : null}
              </div>
            </article>
          ))}

          <div className="earlier-experience" aria-label="Earlier professional experience">
            <h3>Earlier experience</h3>
            <ul>
              {earlierExperience.map((item) => (
                <li key={`${item.period}-${item.title}`}>
                  <span>{item.period}</span>
                  <p><strong>{item.organization}</strong> · {item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="education" aria-labelledby="education-title">
          <h3 id="education-title">Education</h3>
          {education.map((item) => (
            <article key={item.school}>
              <h4>{item.school}</h4>
              <p>{item.credential}</p>
              <p>{item.year}</p>
            </article>
          ))}
        </aside>
      </div>

      <SupportingProjects />
    </GlassSection>
  );
}
