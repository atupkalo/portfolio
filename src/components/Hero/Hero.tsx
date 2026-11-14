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
          <BtnSecondary href="#experience">Resume</BtnSecondary>
          <BtnPrimary href="#contact">Get in touch</BtnPrimary>
        </div>
      </div>
    </section>
  );
}
