"use client";

import SectionReveal from "@/components/ui/SectionReveal";

export default function PhilosophySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <SectionReveal>
          <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-8">
            On building software
          </p>
          <blockquote className="font-display text-3xl md:text-[2.6rem] text-text-primary leading-snug md:leading-tight">
            &ldquo;Build for the environment where your software{" "}
            <span className="text-korea">has to live</span>,<br />
            not the one where you wrote it.&rdquo;
          </blockquote>
          <p className="mt-6 text-text-secondary text-sm max-w-lg mx-auto leading-relaxed">
            Offline clinics in Haiti. Hospital research labs in Seoul.{" "}
            Connectivity, literacy, and resource constraints aren&apos;t edge cases — they&apos;re the brief.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
