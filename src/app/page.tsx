import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { ClientExperience } from "@/components/sections/ClientExperience";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { HomeProjectsCTA, HomeContactCTA } from "@/components/sections/HomeShowcase";
import { Footer } from "@/components/layout/Footer";
import { SiteVideoBackdrop } from "@/components/ui/SiteVideoBackdrop";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <Hero />
      <div className="relative">
        <SiteVideoBackdrop />
        <div className="relative z-10">
          <About />
          <Services />
          <HomeProjectsCTA />
          <Technology />
          <WhyChooseUs />
          <Process />
          <ClientExperience />
          <GlobalReach />
          <HomeContactCTA />
        </div>
      </div>
      <Footer />
    </main>
  );
}
