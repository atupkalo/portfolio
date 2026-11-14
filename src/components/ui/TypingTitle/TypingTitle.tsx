"use client";

import { useEffect, useState } from "react";
import "./TypingTitle.css";

const titles = ["UX UI Designer", "Product Designer"];

export default function TypingTitle() {
  const [text, setText] = useState(titles[0]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let titleIndex = 0;
    let character = 0;
    let deleting = false;

    function tick() {
      const title = titles[titleIndex];
      character += deleting ? -1 : 1;
      setText(title.slice(0, character));

      let delay = deleting ? 45 : 95;
      if (!deleting && character === title.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && character === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    }

    function restart() {
      clearTimeout(timer);
      if (motion.matches) {
        setText(titles[0]);
        return;
      }
      titleIndex = 0;
      character = 0;
      deleting = false;
      setText("");
      timer = setTimeout(tick, 250);
    }

    restart();
    motion.addEventListener("change", restart);
    return () => {
      clearTimeout(timer);
      motion.removeEventListener("change", restart);
    };
  }, []);

  return (
    <h1 id="hero-title" className="typing-title" aria-label="UX UI Designer and Product Designer">
      <span className="typing-title-sizer" aria-hidden="true">Product Designer</span>
      <span className="typing-title-text" aria-hidden="true">{text}<span className="typing-title-cursor">|</span></span>
    </h1>
  );
}
