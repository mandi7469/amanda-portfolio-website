import { GlassSection } from "@/components/ui/GlassSection";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <GlassSection id="skills" title="Skills">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className={`skill-card skill-card-${group.size}`} key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.items.join(", ")}</p>
          </article>
        ))}
      </div>
    </GlassSection>
  );
}
