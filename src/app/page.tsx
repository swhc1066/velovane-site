import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroDawnSection } from "@/components/sections/hero-dawn-section";
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
      <Navbar />
      <main>
        <HeroDawnSection />
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
