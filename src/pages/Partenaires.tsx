import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { PartnersSection } from "../components/sections/PartnersSection";
import { CTASection } from "../components/sections/CTASection";

export default function Partenaires() {
  return (
    <>
      <PageHero
        title="Nos Partenaires"
        subtitle="COOPEC GRACE PLUS collabore avec des institutions reconnues pour offrir les meilleurs services à ses membres."
        badge="🤝 Ensemble, plus forts"
        breadcrumbs={[{ label: "Partenaires" }]}
        bgImage="https://images.unsplash.com/photo-1747774999070-ef45a60c9d00?w=1920&h=600&fit=crop"
      />
      <PartnersSection />
      <CTASection />
    </>
  );
}
