import { FooterCTA } from "@/components/layouts/FooterCTA";
import { FaqSection } from "@/components/modules/home/FaqSection";
import { HeroSection } from "@/components/modules/home/hero-odyssey";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { PromptPlayground } from "@/components/modules/home/PromptPlayground";
import { ToolsSuite } from "@/components/modules/home/ToolsSuite";

export default async function Home() {
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
