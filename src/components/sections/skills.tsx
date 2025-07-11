"use client";

import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";

export function SkillsSection() {
  const { data } = useCV();
  const { skills } = data;

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm font-medium">
            {skill.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
