import type { HTMLAttributes, ReactNode } from "react";

type GlassSectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function GlassSection({
  id,
  title,
  eyebrow,
  children,
  className = "",
  ...props
}: GlassSectionProps) {
  return (
    <section id={id} className={`glass-section ${className}`.trim()} {...props}>
      {title ? (
        <header className="section-heading">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </header>
      ) : null}
      {children}
    </section>
  );
}
