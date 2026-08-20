import Image from "next/image";
import { siGithub } from "simple-icons";
import { siteConfig } from "@/lib/site-config";

export function ContactActions() {
  return (
    <div className="contact-actions">
      <a href={`mailto:${siteConfig.email}`}>
        <span className="contact-action-surface">
          <Image src="/icons/contact-email.png" alt="" width={34} height={34} unoptimized />
        </span>
        <span className="contact-action-label">Email</span>
      </a>
      <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
        <span className="contact-action-surface">
          <Image src="/icons/contact-linkedin.png" alt="" width={34} height={34} unoptimized />
        </span>
        <span className="contact-action-label">LinkedIn</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
        <span className="contact-action-surface">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={siGithub.path} fill="currentColor" />
          </svg>
        </span>
        <span className="contact-action-label">GitHub</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.resume} download>
        <span className="contact-action-surface">
          <Image src="/icons/contact-resume.png" alt="" width={34} height={34} unoptimized />
        </span>
        <span className="contact-action-label">Resume</span>
      </a>
    </div>
  );
}
