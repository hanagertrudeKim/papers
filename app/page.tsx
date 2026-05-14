import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="work">
          <ImpactSection />
          <ProjectsSection />
        </section>
        <section id="timeline">
          <TimelineSection />
        </section>
        <PhilosophySection />
        <section id="about">
          <AboutSection />
        </section>
        <ContactSection />
      </main>
    </>
  );
}
