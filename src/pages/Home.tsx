import { useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import Hero from "../components/Hero";
import IntroSection from "../components/IntroSection";
import FocusAreas from "../components/FocusAreas";
import HowItWorks from "../components/HowItWorks";
import Capabilities from "../components/Capabilities";
import ActiveStudies from "../components/ActiveStudies";
import Methodology from "../components/Methodology";
import GetInvolved from "../components/GetInvolved";
import About from "../components/About";

export default function Home() {
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <IntroSection />
      <FocusAreas />
      <HowItWorks />
      <Capabilities />
      {/* <ActiveStudies /> */}
      <Methodology />
      <GetInvolved />
      <About />
    </div>
  );
}
