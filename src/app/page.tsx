import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Portfolio from "@/components/Portfolio/Portfolio";
import Experience from "@/components/Experience/Experience";
import AboutMe from "@/components/AboutMe/AboutMe";
import Education from "@/components/Education/Education";
import Skills from "@/components/Skills/Skills";
import GetInTouch from "@/components/GetInTouch/GetInTouch";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="main">
        <Hero />
        <Portfolio />
        <Experience />
        <AboutMe />
        <Education />
        <Skills />
        <GetInTouch />
      </main>
      <Footer />
    </>
  );
}
