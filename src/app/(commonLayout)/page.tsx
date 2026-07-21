import { HeroSection } from "@/components/modules/home/hero-odyssey";
import { ToolsSuite } from "@/components/modules/home/ToolsSuite";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { PromptPlayground } from "@/components/modules/home/PromptPlayground";
import { FaqSection } from "@/components/modules/home/FaqSection";
import { FooterCTA } from "@/components/layouts/FooterCTA";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 bg-background font-sans">
      <HeroSection />
      <ToolsSuite />
      <HowItWorks />
      <PromptPlayground />
      <FaqSection />
      <FooterCTA />
    </main>
  );
}
