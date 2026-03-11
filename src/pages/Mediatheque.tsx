import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { MediaSection } from "../components/sections/MediaSection";

export default function Mediatheque() {
  return (
    <>
      <PageHero
        title="Médiathèque"
        subtitle="Découvrez nos événements, projets et moments de vie communautaire en images."
        badge="📸 Nos moments"
        breadcrumbs={[{ label: "Médiathèque" }]}
        bgImage="https://images.unsplash.com/photo-1766407354000-54a7129f7140?w=1920&h=600&fit=crop"
      />
      <MediaSection />
    </>
  );
}
