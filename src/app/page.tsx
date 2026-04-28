import { Navbar } from "@/components/layout/Navbar";
// import { GridOverlay } from "@/components/layout/GridOverlay";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AtmosphericsStrip } from "@/components/sections/atmospherics-strip";
import { RideSceneChapterIntro } from "@/components/sections/ride-scene-chapter-intro";
import { RideMapPanel } from "@/components/sections/RideMapPanel";
import { SceneARevealSection } from "@/components/sections/scene-a-reveal-section";
import { SceneBWalkthroughSection } from "@/components/sections/scene-b-walkthrough-section";
import { AppGallerySection } from "@/components/sections/app-gallery-section";
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
        <RideSceneChapterIntro />
        <RideMapPanel />
        <SceneARevealSection />
        <SceneBWalkthroughSection />
        <AppGallerySection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
