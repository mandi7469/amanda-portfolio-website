import { BackgroundVideo } from "@/components/background/BackgroundVideo";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <BackgroundVideo />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className="site-shell">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <div className="footer-shell">
        <Footer />
      </div>
    </>
  );
}
