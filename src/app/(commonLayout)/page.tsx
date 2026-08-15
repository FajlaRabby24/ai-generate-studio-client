import { FooterCTA } from "@/components/layouts/FooterCTA";
import { FaqSection } from "@/components/modules/home/FaqSection";
import { HeroSection } from "@/components/modules/home/hero-odyssey";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { PromptPlayground } from "@/components/modules/home/PromptPlayground";
import RecentMedia from "@/components/modules/home/RecentMedia";
import { ToolsSuite } from "@/components/modules/home/ToolsSuite";
import { envVars } from "@/config/env";

export default async function Home() {
  const mediaData = await fetch(
    `${envVars.API_BASE_URL}/history/recent-media`,
    {
      next: { revalidate: 43200 }, // ৪৩২০০ সেকেন্ড = ১২ ঘণ্টা (আধা দিন)
    },
  );
  const data = await mediaData.json();

  return (
    <main className="flex flex-col flex-1 bg-background font-sans">
      <HeroSection />
      <RecentMedia recentMedia={data?.data || []} />
      <ToolsSuite />
      <HowItWorks />
      <PromptPlayground />
      <FaqSection />
      <FooterCTA />
    </main>
  );
}
