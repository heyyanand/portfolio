import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import ExperienceSection from "./components/ExperienceSection";
import WorksSection from "./components/WorksSection";
import ReelSection from "./components/ReelSection";
import ContactMe from "./components/ContactMe";

import { useSmoothScroll } from "./lib/useSmoothScroll";

function App() {
  useSmoothScroll();

  return (
    <div className="bg-[#ECECE8] min-h-screen text-black">
      <HeroSection />
      <JourneySection />
      <ExperienceSection />
      <WorksSection />
      <ReelSection />
      <ContactMe />
    </div>
  );
}

export default App;