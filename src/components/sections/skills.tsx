"use client";

import { useCV } from "../cv-container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export function SkillsSection() {
  const { data } = useCV();
  const { skills, sections } = data;

  return (
    <section id="skills" className="scroll-mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{sections.skills}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="mb-1 flex justify-between items-center">
                    <span className="text-base font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
