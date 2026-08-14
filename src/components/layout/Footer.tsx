import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer glass-section">
      <div className="footer-primary">
        <a className="footer-brand" href="#home" aria-label="Amanda Changa, back to top">
          <Image src="/brand/ac-logo-white.svg" alt="" width={54} height={38} />
          <span>Amanda Changa</span>
        </a>
        <nav aria-label="Footer navigation">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </nav>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} Amanda Changa</p>
    </footer>
  );
}
