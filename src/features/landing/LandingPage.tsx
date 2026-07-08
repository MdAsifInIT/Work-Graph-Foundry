import { BrandLogo } from "../../components/shared/BrandLogo";
import { HeroSection } from "./HeroSection";
import { WorkGraphAnimation } from "./WorkGraphAnimation";
import { BentoFeatures } from "./BentoFeatures";
import { FinalCta } from "./FinalCta";

interface LandingPageProps {
  onLaunch: () => void;
  onPrepareWorkspace: () => void;
}

export function LandingPage({
  onLaunch,
  onPrepareWorkspace
}: LandingPageProps) {
  return (
    <main 
      className="min-h-screen bg-[#F8FAFC] selection:bg-[#0369A1]/20 relative overflow-hidden"
      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
    >
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50" aria-label="Landing navigation">
        <BrandLogo variant="landing" />
      </header>

      <HeroSection onLaunch={onLaunch} onPrepareWorkspace={onPrepareWorkspace} />
      
      <WorkGraphAnimation onPrepareWorkspace={onPrepareWorkspace} />
      
      <BentoFeatures />
      
      <FinalCta onLaunch={onLaunch} onPrepareWorkspace={onPrepareWorkspace} />
    </main>
  );
}
