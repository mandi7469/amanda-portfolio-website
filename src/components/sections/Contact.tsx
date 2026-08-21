import { ArrowUp } from "lucide-react";
import { ContactActions } from "@/components/sections/ContactActions";
import { GlassSection } from "@/components/ui/GlassSection";

export function Contact() {
  return (
    <GlassSection id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-copy">
        <h2 id="contact-title">Let&apos;s work together.</h2>
        <p>Have a role, project, or product you think I&apos;d be a good fit for? I&apos;d love to hear about it.</p>
        <a className="contact-back-to-top" href="#home">
          <ArrowUp aria-hidden="true" strokeWidth={2.5} /> Back to top
        </a>
      </div>
      <ContactActions />
    </GlassSection>
  );
}
