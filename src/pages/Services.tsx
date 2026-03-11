import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { ServicesSection } from "../components/sections/ServicesSection";
import { CTASection } from "../components/sections/CTASection";

export default function Services() {
  return (
    <>
      <PageHero
        title="Nos Services Financiers"
        subtitle="Des solutions accessibles, abordables et adaptées pour accompagner chaque étape de votre vie."
        badge="💼 Solutions financières"
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServicesSection />
      <CTASection />
    </>
  );
}
