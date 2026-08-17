"use client";

import { Check, Clipboard, Download, ExternalLink, Mail } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-actions">
      <a href={`mailto:${siteConfig.email}`}>
        <Mail aria-hidden="true" /> Email Amanda
      </a>
      <button type="button" onClick={copyEmail}>
        {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
        {copied ? "Email copied" : "Copy email address"}
      </button>
      <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
        <ExternalLink aria-hidden="true" /> LinkedIn
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
        <ExternalLink aria-hidden="true" /> GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={siteConfig.resume} download>
        <Download aria-hidden="true" /> Download résumé
      </a>
      <p className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard." : ""}
      </p>
    </div>
  );
}
