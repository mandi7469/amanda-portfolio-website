import { GlassSection } from "@/components/ui/GlassSection";
import { skillGroups } from "@/data/portfolio";
import { SkillIcon } from "./SkillIcon";

export function Skills() {
  return (
    <GlassSection id="skills" title="Technical Skills" className="skills-section">
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <article className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skill-bubbles" aria-label={`${group.title} skills`}>
              {group.items.map((skill) => (
                <li className="skill-bubble-item" key={skill}>
                  <span className="skill-bubble-surface">
                    <SkillIcon name={skill} />
                  </span>
                  <span className="skill-bubble-label">{skill}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </GlassSection>
  );
}
