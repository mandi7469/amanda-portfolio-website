import Image from "next/image";
import { Download } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassSection } from "@/components/ui/GlassSection";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <GlassSection id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-eyebrow">FRONTEND · FULL-STACK · AI-ASSISTED DEVELOPMENT</p>
        <h1 id="hero-title">Amanda Changa</h1>
        <p className="hero-role">Frontend / Full-Stack Developer</p>
        <p className="hero-summary">
          I design, build, test, and deploy responsive production websites and web applications
          with React, Next.js, TypeScript, Node.js, and AI-assisted workflows.
        </p>
        <div className="hero-actions">
          <GlassButton href="#projects">View projects</GlassButton>
          <GlassButton href={siteConfig.resume} download>
            <Download aria-hidden="true" /> Resume
          </GlassButton>
        </div>
      </div>
      <div className="portrait-frame">
        <Image
          src="/images/amanda-changa-headshot-transparent.png"
          alt="Amanda Changa"
          fill
          priority
          sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 460px"
        />
      </div>
    </GlassSection>
  );
}
