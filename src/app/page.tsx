import { SpaceVideoBackdrop } from "@/components/ui/SpaceVideoBackdrop";
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Technology } from "@/components/sections/Technology";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { ClientExperience } from "@/components/sections/ClientExperience";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <SpaceVideoBackdrop />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Technology />
      <WhyChooseUs />
      <Process />
      <ClientExperience />
      <GlobalReach />
      <Contact />
      <Footer />
    </main>
  );
}
