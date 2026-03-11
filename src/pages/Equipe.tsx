import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { TeamSection } from "../components/sections/TeamSection";
import { CTASection } from "../components/sections/CTASection";

export default function Equipe() {
  return (
    <>
      <PageHero
        title="Notre Équipe"
        subtitle="Des professionnels passionnés et engagés, unis par la même vision : offrir les meilleurs services financiers."
        badge="👥 L'humain au cœur"
        breadcrumbs={[{ label: "Notre équipe" }]}
        bgImage="https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?w=1920&h=600&fit=crop"
      />
      <TeamSection />
      <CTASection />
    </>
  );
}
