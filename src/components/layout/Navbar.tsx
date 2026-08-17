"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("nav-open");
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 820) setIsOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav ref={navRef} className="glass-nav" data-open={isOpen} aria-label="Primary navigation">
        <a className="brand-link" href="#home" aria-label="Amanda Changa, home" onClick={closeMenu}>
          <Image
            src="/brand/ac-logo-white.svg"
            alt=""
            width={60}
            height={42}
            priority
          />
        </a>

        <ul className="desktop-nav-list">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <li key={item.href}>
                <a href={item.href} aria-current={activeId === id ? "page" : undefined}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <a className="nav-hire" href="#contact" onClick={closeMenu}>
            Hire me
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className="mobile-nav-panel"
          data-open={isOpen}
          aria-hidden={!isOpen}
        >
          <ul>
            {navItems.map((item, index) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    tabIndex={isOpen ? 0 : -1}
                    aria-current={activeId === id ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="mobile-hire-item">
              <a
                className="mobile-nav-hire"
                href="#contact"
                tabIndex={isOpen ? 0 : -1}
                onClick={closeMenu}
              >
                Hire me
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
