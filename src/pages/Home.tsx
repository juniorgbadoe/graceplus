import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { ServicesSection } from "../components/sections/ServicesSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { PartnersSection } from "../components/sections/PartnersSection";
import { CTASection } from "../components/sections/CTASection";
import { AgencesTeaser } from "../components/sections/AgencesTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <ServicesSection preview />
      <AgencesTeaser />
      <TestimonialsSection />
      <PartnersSection preview />
      <CTASection />
    </>
  );
}
