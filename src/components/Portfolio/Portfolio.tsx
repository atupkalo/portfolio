"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Portfolio.css";
import ProjectDetails from "./ProjectDetails";
import { projectDetails } from "./project-details";
import Section from "../Section/Section";
import BtnSecondary from "../ui/BtnSecondary/BtnSecondary";

const projects = [
  {
    title: "SAMS - State Aid Management System",
    description: "A large-scale enterprise software platform for internal state aid management.",
    type: "B2B / EdTech / FinTech",
    year: "2025 - Present",
  },
  {
    title: "EnContexti - English Learning Platform",
    description: "An educational platform for people learning English as a second language.",
    type: "B2C / EdTech",
    year: "2025 - 2026",
  },
  {
    title: "TutorHub - Educational Resource Library for Freelance Teachers",
    description: "An educational platform that helps independent teachers conduct lessons, manage schedules, and access a shared hub of teaching materials.",
    type: "B2B / EdTech",
    year: "2023 - 2025",
  },
  {
    title: "Caesar's Scissors - Hair Salon Scheduling and Management System",
    description: "An application for hair salons to manage appointments, coordinate staff, and streamline day-to-day business operations.",
    type: "B2B / Commercial",
    year: "2024 - 2024",
  },
];

export default function Portfolio() {
  const track = useRef<HTMLDivElement>(null);
  const [detailsTrigger, setDetailsTrigger] = useState<HTMLButtonElement | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [visible, setVisible] = useState<number[]>([]);

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

  function showProject(index: number) {
    setActiveProject(null);
    const element = track.current;
    const card = element?.querySelector<HTMLElement>(".card");
    if (!element || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(element).columnGap);
    element.scrollTo({ left: index * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function move(direction: number) {
    setActiveProject(null);
    const element = track.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>(".card");
    if (!card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(element).columnGap);
    const end = element.scrollWidth - element.clientWidth;
    const currentIndex = Math.round(element.scrollLeft / step);
    const left = Math.max(0, Math.min(end, (currentIndex + direction) * step));
    element.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <Section id="portfolio" title="Portfolio" subtitle="A selection of my recent work">
      <div className="portfolio-slider" role="region" aria-roledescription="carousel" aria-label="Portfolio projects">
        <div className="portfolio-slider-controls">
          <button className="portfolio-arrow" type="button" onClick={() => move(-1)} disabled={visible.includes(0)} aria-label="Previous project" aria-controls="portfolio-track">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <div className="portfolio-indicators" aria-label="Project visibility">
            {projects.map((project, index) => (
              <button key={project.title} className="portfolio-indicator" type="button" onClick={() => showProject(index)} aria-label={`Show project ${index + 1}: ${project.title}`} aria-pressed={visible.includes(index)} aria-controls="portfolio-track">{index + 1}</button>
            ))}
          </div>
          <button className="portfolio-arrow" type="button" onClick={() => move(1)} disabled={visible.includes(projects.length - 1)} aria-label="Next project" aria-controls="portfolio-track">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
        <div id="portfolio-track" className="portfolio-track" ref={track} tabIndex={0} aria-label="Project cards, scroll horizontally to explore">
          {projects.map((project, index) => (
            <div className="card glass" key={project.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
              <Image className="project-image" src="/project-placeholder.svg" alt="Project image placeholder" width={720} height={480} sizes="(max-width: 767px) 90vw, 45vw" />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-type">{project.type}</p>
                {project.year && <p className="project-year">{project.year}</p>}
                <p className="project-description">{project.description}</p>
                <div className="project-actions">
                  <BtnSecondary onClick={event => { setDetailsTrigger(event.currentTarget); setActiveProject(activeProject === index ? null : index); }} aria-expanded={activeProject === index} aria-controls={activeProject === index ? "project-popover" : undefined} aria-haspopup="dialog" className="project-details-button" aria-label={`Details about ${project.title}`}>Details</BtnSecondary>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeProject !== null && <ProjectDetails key={activeProject} trigger={detailsTrigger!} title={projects[activeProject].title} {...projectDetails[activeProject]} onClose={() => setActiveProject(null)} />}
    </Section>
  );
}
