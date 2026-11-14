"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Section from "../Section/Section";
import BtnSecondary from "../ui/BtnSecondary/BtnSecondary";
import { experience } from "./experience-data";
import "./Experience.css";

export default function Experience() {
  const track = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [visible, setVisible] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    function updateVisible() {
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const next = Array.from(element.querySelectorAll<HTMLElement>(".card")).flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        const overlap = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
        return overlap > rect.width / 2 ? [index] : [];
      });
      setVisible(previous => previous.join() === next.join() ? previous : next);
    }
    const observer = new ResizeObserver(updateVisible);
    observer.observe(element);
    element.addEventListener("scroll", updateVisible, { passive: true });
    updateVisible();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", updateVisible);
    };
  }, []);

  function showExperience(index: number) {
    setActive(null);
    const element = track.current;
    const card = element?.querySelector<HTMLElement>(".card");
    if (!element || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
    element.scrollTo({ left: index * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function keepOpen() { clearTimeout(closeTimer.current); }
  function closeSoon() { keepOpen(); closeTimer.current = setTimeout(() => setActive(null), 180); }
  function open(index: number, button: HTMLButtonElement) {
    keepOpen();
    trigger.current = button;
    const rect = button.getBoundingClientRect();
    const width = Math.min(460, window.innerWidth - 32);
    const height = Math.min(440, window.innerHeight - 32);
    setPosition({ left: Math.max(16, Math.min(rect.right - width, window.innerWidth - width - 16)), top: Math.max(16, Math.min(rect.bottom + 10, window.innerHeight - height - 16)) });
    setActive(index);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);
  useEffect(() => {
    if (active === null) return;
    function dismiss(event: PointerEvent) {
      if (!popup.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) setActive(null);
    }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") setActive(null); }
    function resize() { setActive(null); }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  function move(direction: number) {
    setActive(null);
    const element = track.current;
    const card = element?.querySelector<HTMLElement>(".card");
    if (!element || !card) return;
    const step = card.getBoundingClientRect().width + 24;
    element.scrollTo({ left: (Math.round(element.scrollLeft / step) + direction) * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <Section id="experience" title="Experience" subtitle="Worked for and with">
      <div className="experience-controls">
        <button type="button" className="experience-arrow" onClick={() => move(-1)} disabled={visible.includes(0)} aria-label="Previous experience" aria-controls="experience-track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg></button>
        <div className="experience-indicators" aria-label="Experience visibility">
          {experience.map((job, index) => (
            <button type="button" className="experience-indicator" key={job.company} onClick={() => showExperience(index)} aria-label={`Show experience ${index + 1}: ${job.company}`} aria-pressed={visible.includes(index)} aria-controls="experience-track">{index + 1}</button>
          ))}
        </div>
        <button type="button" className="experience-arrow" onClick={() => move(1)} disabled={visible.includes(experience.length - 1)} aria-label="Next experience" aria-controls="experience-track"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
      </div>
      <div ref={track} id="experience-track" className="experience-track" tabIndex={0} aria-label="Work experience, scroll horizontally" onScroll={() => setActive(null)}>
        {experience.map((job, index) => (
          <div className="card experience-card glass" key={job.company}>
            <h3>{job.company}</h3>
            <p className="experience-company-description">{job.description}</p>
            <p className="experience-dates">{job.dates}</p>
            <p className="experience-role">{job.role}</p>
            <div className="experience-actions">
              <BtnSecondary className="experience-details" aria-label={`Details about ${job.role} at ${job.company}`} aria-expanded={active === index} aria-controls={active === index ? "experience-popover" : undefined} aria-haspopup="dialog"
                onMouseEnter={event => open(index, event.currentTarget)} onMouseLeave={closeSoon}
                onFocus={event => open(index, event.currentTarget)} onBlur={closeSoon}
                onClick={event => open(index, event.currentTarget)}>Details</BtnSecondary>
            </div>
          </div>
        ))}
      </div>
      {active !== null && createPortal(
        <div id="experience-popover" className="experience-popover" ref={popup} role="dialog" aria-modal="false" aria-labelledby="experience-popover-title" style={position}
          onMouseEnter={keepOpen} onMouseLeave={closeSoon} onFocus={keepOpen} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeSoon(); }}>
          <button className="experience-popover-close" type="button" aria-label="Close experience details" onClick={() => setActive(null)}>×</button>
          <h3 id="experience-popover-title">{experience[active].company}</h3>
          <ul tabIndex={0}>{experience[active].bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
        </div>, document.body
      )}
    </Section>
  );
}
