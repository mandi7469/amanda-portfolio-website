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
  const shouldFocusFirstLinkRef = useRef(false);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    let scrollFrame: number | undefined;
    const updateActiveSection = () => {
      scrollFrame = undefined;
      const activationLine = window.innerHeight * 0.35;
      const atPageBottom = window.scrollY > 0
        && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
      let activeSection = sections[0];

      // A short final section may never reach the activation line before scrolling stops.
      if (atPageBottom) {
        activeSection = sections[sections.length - 1];
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) activeSection = section;
        }
      }

      setActiveId(activeSection.id);
    };
    const scheduleUpdate = () => {
      if (scrollFrame === undefined) scrollFrame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("nav-open");
    const focusFrame = shouldFocusFirstLinkRef.current
      ? window.requestAnimationFrame(() => firstLinkRef.current?.focus())
      : undefined;

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
      if (focusFrame !== undefined) window.cancelAnimationFrame(focusFrame);
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
            onClick={(event) => {
              shouldFocusFirstLinkRef.current = event.detail === 0;
              setIsOpen((open) => !open);
            }}
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
