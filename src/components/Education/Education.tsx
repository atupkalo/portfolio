"use client";

import { useEffect, useRef, useState } from "react";
import "./Education.css";
import Section from "../Section/Section";

const education = [
  { icon: "colledge.svg", label: "University", dates: "08/1997 - 06/2001", description: "Poltav'skij Nacional'nij Tehnicnij Universytet imeni Yuriya Kundratiuka", qualification: "Bachelor’s degree" },
  { icon: "school.svg", label: "School", dates: "02/2015 - 09/2015", description: "LoftSchool", qualification: "Front-End Development - Beginner" },
  { icon: "school.svg", label: "School", dates: "11/2015 - 05/2016", description: "LoftSchool", qualification: "Front-End Development - Advanced" },
  { icon: "school.svg", label: "School", dates: "03/2016 - 06/2016", description: "LoftSchool", qualification: "PHP" },
  { icon: "colledge.svg", label: "University", dates: "08/2016 - 05/2017", description: "University of Denver", qualification: "Product Design" },
  { icon: "school.svg", label: "School", dates: "09/2023 - 02/2024", description: "Design Lab", qualification: "UX/UI Design" },
];

export default function Education() {
  const track = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    function updateVisible() {
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const next = Array.from(element.children).flatMap((item, index) => {
        const rect = item.getBoundingClientRect();
        return Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left) > rect.width / 2 ? [index] : [];
      });
      setVisible(previous => previous.join() === next.join() ? previous : next);
    }
    const observer = new ResizeObserver(updateVisible);
    observer.observe(element);
    element.addEventListener("scroll", updateVisible, { passive: true });
    updateVisible();
    return () => { observer.disconnect(); element.removeEventListener("scroll", updateVisible); };
  }, []);

  function navigate(index: number, relative = false) {
    const element = track.current;
    const item = element?.firstElementChild;
    if (!element || !item) return;
    const step = item.getBoundingClientRect().width;
    const target = relative ? Math.round(element.scrollLeft / step) + index : index;
    element.scrollTo({ left: target * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <Section id="education" title="Education" subtitle="The foundations of my craft">
      <div className="education-slider-controls">
        <button className="education-arrow" type="button" aria-label="Previous education" aria-controls="education-track" disabled={visible.includes(0)} onClick={() => navigate(-1, true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg></button>
        <div className="education-indicators" aria-label="Visible education items">
          {education.map((_, index) => <button key={index} type="button" aria-label={`Show education ${index + 1}`} aria-pressed={visible.includes(index)} aria-controls="education-track" onClick={() => navigate(index)}>{index + 1}</button>)}
        </div>
        <button className="education-arrow" type="button" aria-label="Next education" aria-controls="education-track" disabled={visible.includes(education.length - 1)} onClick={() => navigate(1, true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg></button>
      </div>
      <div className="education-timeline">
        <ol id="education-track" className="education-stops" ref={track} tabIndex={0} aria-label="Education timeline, scroll horizontally">
          {education.map((item, index) => (
            <li className="education-stop" key={index}>
              <span className="education-date glass">{item.dates}</span>
              <div className="education-circle glass">
                <span className="education-icon" role="img" aria-label={item.label} style={{ maskImage: `url(/svg/${item.icon})`, WebkitMaskImage: `url(/svg/${item.icon})` }} />
                <p>{item.description}<br /><span className="education-qualification">{item.qualification}</span></p>
              </div>
            </li>
          ))}
        </ol>
        <div className="education-continued"><span>to be continued</span><svg viewBox="0 0 48 32" width="48" height="32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M0 16h44M29 2l15 14-15 14" /></svg></div>
      </div>
    </Section>
  );
}
