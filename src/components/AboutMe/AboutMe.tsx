import Image from "next/image";
import "./AboutMe.css";
import Section from "../Section/Section";

export default function AboutMe() {
  return (
    <Section id="about" title="About me" subtitle="My story">
      <div className="about-story">
        <Image className="about-story-image" src="/project-placeholder.svg" alt="Portrait placeholder" width={400} height={400} sizes="(max-width: 600px) 70vw, 360px" />
        <p>My path into product design started with art and architecture. I hold a bachelor’s degree in Architecture and Fine Art, and I spent more than a decade working as an artist before moving to the United States. That background shaped how I see things: composition, balance, and the relationship between individual details and the whole.</p>
        <p>When I discovered the world of web development, I saw an opportunity to take my creativity in a new direction. I started as a front-end developer, learning how to turn ideas into working websites and applications. I enjoyed the logic and problem-solving, but spending most of my time writing code left part of my creative side unfulfilled. UX/UI and product design brought those two sides together. I could think like an artist, work through problems logically, and build something people could actually use.</p>
        <p>Today, I bring seven years of UX/UI experience and around twelve years across digital design and front-end development. My work spans consumer products, business tools, SaaS platforms, and large-scale enterprise applications in education, finance, and healthcare. Across those settings, I’m drawn to the same challenge: understanding a complicated problem and finding a clear, useful way forward.</p>
        <p>My process connects research and analysis with visual exploration, prototyping, and testing. I work closely with cross-functional teams to understand user needs, question assumptions, and refine ideas into practical solutions. Figma and Adobe Creative Cloud help me develop those ideas, while my knowledge of HTML, CSS, JavaScript, and React helps me understand how they will work beyond the design file. I also use AI-assisted tools to explore, prototype, and build more quickly, leaving more room to evaluate the experience itself.</p>
        <p>For me, product design is where my artistic background and technical curiosity meet. It gives me a way to create work that feels thoughtful, looks considered, and makes someone’s day a little easier.</p>
      </div>
    </Section>
  );
}
