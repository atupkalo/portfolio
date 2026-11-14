import Image from "next/image";
import BtnPrimary from "../ui/BtnPrimary/BtnPrimary";
import BtnSecondary from "../ui/BtnSecondary/BtnSecondary";
import TypingTitle from "../ui/TypingTitle/TypingTitle";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero glass" aria-labelledby="hero-title">
      <div className="hero-portrait">
        <Image
          src="/avatar.png"
          alt="Anatolii Tupkalo"
          width={1500}
          height={1500}
          sizes="(max-width: 919px) 90vw, (max-width: 1400px) 44vw, 580px"
          preload
        />
      </div>
      <div className="hero-content">
        <p className="hero-name">Anatolii Tupkalo</p>
        <TypingTitle />
        <p className="hero-description">I design digital experiences that make complex things feel simple. My focus is on clear user journeys, thoughtful interfaces, and the small details that make a product feel right. I bring curiosity and a hands-on approach to turning ideas into experiences people enjoy using.</p>
        <div className="hero-actions">
          <BtnSecondary href="https://docs.google.com/document/d/13gpti0HT-YP3LQ5J-_aJOsaeQ0l2EpN8/edit?usp=sharing&ouid=106588430735065196379&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">Resume</BtnSecondary>
          <BtnPrimary href="#contact">Get in touch</BtnPrimary>
        </div>
      </div>
    </section>
  );
}
