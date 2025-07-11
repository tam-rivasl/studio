"use client";

import { useCV } from "../cv-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ExperienceSection() {
  const { data } = useCV();
  const { experience, sections } = data;

  return (
    <section id="experience" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{sections.experience}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experience.map((job, index) => (
            <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-0.5 before:bg-border">
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 bg-primary border-2 border-border"></div>
              <p className="text-sm text-muted-foreground font-body">{job.period}</p>
              <h3 className="text-xl font-semibold font-headline">{job.role}</h3>
              <p className="text-md text-accent font-medium font-body">{job.company}</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-base font-body">
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
