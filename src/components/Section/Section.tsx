"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./Section.css";

export default function Section({ id, subtitle, title, children }: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const headingRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div ref={headingRef} className={`section-intro${revealed ? " is-revealed" : ""}`}>
        <h2 className="section-heading" id={`${id}-title`}>{title}</h2>
        {subtitle && <div className="section-subtitle">{subtitle}</div>}
      </div>
      {children}
    </section>
  );
}
