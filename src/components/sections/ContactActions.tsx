import { ArrowUp, Download, ExternalLink, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ContactActions() {
  return (
    <div className="contact-actions">
      <a href={`mailto:${siteConfig.email}`}>
        <Mail aria-hidden="true" /> Email
      </a>
      <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
        <ExternalLink aria-hidden="true" /> LinkedIn
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
        <ExternalLink aria-hidden="true" /> GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.resume} download>
        <Download aria-hidden="true" /> Resume
      </a>
      <a href="#home">
        <ArrowUp aria-hidden="true" /> Back to top
      </a>
    </div>
  );
}
