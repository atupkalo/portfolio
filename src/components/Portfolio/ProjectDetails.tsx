"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import BtnPrimary from "../ui/BtnPrimary/BtnPrimary";
import "./ProjectDetails.css";

type Props = { title: string; description: string; caseStudy: string | null; trigger: HTMLButtonElement; onClose: () => void };

export default function ProjectDetails({ title, description, caseStudy, trigger, onClose }: Props) {
  const popup = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = popup.current;
    if (!element) return;
    const rect = trigger.getBoundingClientRect();
    const { width, height } = element.getBoundingClientRect();
    const left = Math.max(16, Math.min(rect.right - width, window.innerWidth - width - 16));
    const top = Math.max(16, Math.min(rect.bottom + 10, window.innerHeight - height - 16));
    element.style.left = `${left + window.scrollX}px`;
    element.style.top = `${top + window.scrollY}px`;
  }, [trigger, title]);

  useEffect(() => {
    popup.current?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent) {
      if (!popup.current?.contains(event.target as Node) && !trigger.contains(event.target as Node)) onClose();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { onClose(); trigger.focus({ preventScroll: true }); }
    }
    function scroll(event: Event) {
      if (event.target instanceof HTMLElement && event.target.id === "portfolio-track") onClose();
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", onClose);
    document.addEventListener("scroll", scroll, true);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", onClose);
      document.removeEventListener("scroll", scroll, true);
    };
  }, [trigger, onClose]);

  return createPortal(
    <div id="project-popover" ref={popup} className="project-popover" role="dialog" aria-modal="false" aria-labelledby="project-popover-title" tabIndex={-1}>
      <button type="button" className="project-popover-close" aria-label="Close project details" onClick={() => { onClose(); trigger.focus({ preventScroll: true }); }}>×</button>
      <h3 id="project-popover-title">{title}</h3>
      <div className="project-popover-content">
        <p>{description}</p>
        <div className="project-popover-actions">
          {caseStudy ? <BtnPrimary href={caseStudy} target="_blank" rel="noopener noreferrer">View case study</BtnPrimary> : <>
            <p id="case-study-pending">Case study coming soon.</p>
            <BtnPrimary disabled aria-describedby="case-study-pending">View case study</BtnPrimary>
          </>}
        </div>
      </div>
    </div>, document.body
  );
}
