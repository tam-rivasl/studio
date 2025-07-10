"use client";

import { useCV } from "../cv-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function EducationSection() {
  const { data } = useCV();
  const { education, sections } = data;

  return (
    <section id="education" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{sections.education}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index}>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
              <h3 className="text-xl font-semibold font-headline">{edu.degree}</h3>
              <p className="text-md text-accent font-medium">{edu.institution}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
