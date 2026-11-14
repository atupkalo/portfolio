"use client";

import { useEffect, useRef, useState } from "react";
import "./MobileNavigation.css";

type Props = { sections: readonly (readonly [string, string])[] };

export default function MobileNavigation({ sections }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  function show() {
    clearTimeout(timer.current);
    setClosing(false);
    dialog.current?.showModal();
    setOpen(true);
  }

  function hide() {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(() => {
      dialog.current?.close();
      setClosing(false);
      setOpen(false);
      toggle.current?.focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 250);
  }

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 920px)");
    function checkWidth() {
      if (desktop.matches) {
        clearTimeout(timer.current);
        dialog.current?.close();
        setOpen(false);
        setClosing(false);
      }
    }
    desktop.addEventListener("change", checkWidth);
    checkWidth();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", checkWidth);
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button ref={toggle} type="button" className="mobile-menu-toggle" onClick={show} aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-menu">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <dialog ref={dialog} id="mobile-menu" className={`mobile-menu${closing ? " is-closing" : ""}`} aria-label="Mobile navigation"
        onCancel={event => { event.preventDefault(); hide(); }} onClose={() => { setOpen(false); setClosing(false); }}
        onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) hide(); } }}>
        <div className="mobile-menu-heading">
          <button type="button" className="mobile-menu-close" onClick={hide} aria-label="Close navigation"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </div>
        <nav aria-label="Mobile navigation">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="glass-clickble" onClick={hide}>{label}</a>)}
        </nav>
      </dialog>
    </div>
  );
}
