import React from "react";
import { PageHero } from "../components/ui/PageHero";
import { ContactSection } from "../components/sections/ContactSection";

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contactez-nous"
        subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets."
        badge="📍 Localisation & Contact"
        breadcrumbs={[{ label: "Contact" }]}
        bgImage="https://images.unsplash.com/photo-1742996111692-2d924f12a058?w=1920&h=600&fit=crop"
      />
      <ContactSection />
    </>
  );
}
