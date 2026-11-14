"use client";

import "./Footer.css";

const sections = [
  ["portfolio", "Portfolio"],
  ["experience", "Experience"],
  ["about", "About me"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["contact", "Get in touch"],
] as const;

// Add profile URLs here when available. Unconnected slots stay disabled.
const socialLinks: { label: string; icon: string; href: string | null }[] = [
  { label: "LinkedIn", icon: "linkedin-01-stroke-rounded.svg", href: null },
  { label: "Behance", icon: "behance-02-stroke-rounded.svg", href: null },
  { label: "Dribbble", icon: "dribbble-stroke-rounded.svg", href: null },
  { label: "GitHub", icon: "github-01-stroke-rounded.svg", href: null },
  { label: "Facebook", icon: "facebook-01-stroke-rounded.svg", href: null },
  { label: "Pinterest", icon: "pinterest-stroke-rounded.svg", href: null },
];

function SocialIcon({ icon }: { icon: string }) {
  return <span className="footer-social-icon" aria-hidden="true" style={{ maskImage: `url(/svg/${icon})`, WebkitMaskImage: `url(/svg/${icon})` }} />;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-up" href="#hero" aria-label="Back to top" onClick={event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }}>Up
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
      </a>
      <nav className="footer-navigation" aria-label="Footer navigation">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="footer-divider" />
      <div className="footer-socials" aria-label="Social profiles">
        {socialLinks.map(profile => profile.href ? (
          <a key={profile.label} href={profile.href} aria-label={profile.label} target="_blank" rel="noopener noreferrer"><SocialIcon icon={profile.icon} /></a>
        ) : (
          <button key={profile.label} type="button" disabled aria-label={`${profile.label}, not connected`} title="Profile link coming soon"><SocialIcon icon={profile.icon} /></button>
        ))}
      </div>
      <p className="footer-copyright">UX UI Designer - Anatolii Tupkalo</p>
    </footer>
  );
}
