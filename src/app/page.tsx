import { Navbar } from "@/components/layout/Navbar";
// import { GridOverlay } from "@/components/layout/GridOverlay";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AtmosphericsStrip } from "@/components/sections/atmospherics-strip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { RideMapPanel } from "@/components/sections/RideMapPanel";
import { VeloVaneRevealSection } from "@/components/sections/VeloVaneRevealSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      {/* <GridOverlay /> */}
      <Navbar />
      <main>
        <HeroSection />
        <AtmosphericsStrip />
        <ProblemSection />
        <RideMapPanel />
        <VeloVaneRevealSection />
        <FeaturesSection />
        <PlatformSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
