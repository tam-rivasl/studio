"use client";
import { useCV } from "../cv-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AboutSection() {
  const { data } = useCV();
  const { personalInfo, sections } = data;

  return (
    <section id="about" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{sections.about}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed font-body">{personalInfo.about}</p>
        </CardContent>
      </Card>
    </section>
  );
}
