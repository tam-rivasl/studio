"use client";
import { useCV } from "../cv-container";

export function AboutSection() {
  const { data } = useCV();
  const { basics } = data;

  return (
    <section id="about" className="scroll-mt-20">
       <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="text-base leading-relaxed text-muted-foreground">{basics.summary}</p>
    </section>
  );
}
