import "./Header.css";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import Image from "next/image";
import Link from "next/link";

const sections = [
  ["portfolio", "Portfolio"],
  ["experience", "Experience"],
  ["about", "About me"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["contact", "Get in touch"],
] as const;

export default function Header() {
  return (
    <header className="p-header f-row-between">
      <Link href="/" aria-label="Home">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </Link>
        <div className="desktop-navigation">
          <nav className="f-row-between main-navigation" aria-label="Main navigation">
            {sections.map(([id, label]) => <a key={id} className="glass-clickble nav-link" href={`#${id}`}>{label}</a>)}
          </nav>
        </div>
      <MobileNavigation sections={sections} />
      </header>
  );
}
