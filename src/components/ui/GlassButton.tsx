import type { ReactNode } from "react";

type GlassButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
};

export function GlassButton({
  href,
  children,
  className = "",
  download,
  external,
}: GlassButtonProps) {
  return (
    <a
      className={`glass-button ${className}`.trim()}
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
