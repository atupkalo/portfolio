"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import "./Skills.css";
import Section from "../Section/Section";

const uxSkills = [
  ["User Research", 75],
  ["Wireframing", 95],
  ["Prototyping", 95],
  ["Interaction Design", 75],
  ["Usability Testing", 95],
  ["Design Systems", 95],
] as const;
const codingSkills = [["HTML", 95], ["CSS", 95], ["JavaScript", 75], ["PHP", 50]] as const;
const frameworks = [["React", 60], ["Next.js", 75], ["Angular", 50], ["WordPress", 95], ["FlutterFlow", 50]] as const;
const tools = [["Figma", 80], ["Adobe Creative Cloud", 75], ["AI-assisted Tools", 80]] as const;

function SkillGroup({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`skill-group${visible ? " is-visible" : ""}`}><h3 className="section-subtitle">{title}</h3>{children}</div>;
}

function scoreStyle(value: number): CSSProperties {
  return { "--score": value / 100, "--ring-offset": 100 - value } as CSSProperties;
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills-groups">
        <SkillGroup title="UX/UI Design">
          <div className="ux-skill-list">
            {uxSkills.map(([name, value]) => (
              <div className="ux-skill" key={name} role="meter" aria-label={name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={scoreStyle(value)}>
                <div className="skill-label"><span>{name}</span><span>{value}%</span></div>
                <div className="skill-track" aria-hidden="true"><div className="skill-fill" /></div>
              </div>
            ))}
          </div>
        </SkillGroup>
        <SkillGroup title="Coding">
          <div className="coding-skills">
            {codingSkills.map(([name, value]) => (
              <div className="coding-skill" key={name} role="meter" aria-label={name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={scoreStyle(value)}>
                <div className="skill-donut">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle className="skill-ring-track" cx="60" cy="60" r="50" />
                    <circle className="skill-ring-fill" cx="60" cy="60" r="50" pathLength="100" />
                  </svg>
                  <span>{value}%</span>
                </div>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </SkillGroup>
        <SkillGroup title="Frameworks & Platforms">
          <div className="coding-skills">
            {frameworks.map(([name, value]) => (
              <div className="coding-skill" key={name} role="meter" aria-label={name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={scoreStyle(value)}>
                <div className="skill-circle">
                  <div className="skill-circle-fill" aria-hidden="true" />
                  <span>{value}%</span>
                </div>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </SkillGroup>
        <SkillGroup title="Tools">
          <div className="tool-chart">
            {tools.map(([name, value]) => (
              <div className="tool-skill" key={name} role="meter" aria-label={name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} style={scoreStyle(value)}>
                <span className="tool-score">{value}%</span>
                <div className="tool-track" aria-hidden="true"><div className="tool-fill" /></div>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </SkillGroup>
      </div>
    </Section>
  );
}
