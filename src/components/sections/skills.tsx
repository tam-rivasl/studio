"use client";

import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";
import { Icon } from "@/components/icon";

export function SkillsSection() {
  const { data } = useCV();
  const { skills, basics } = data;

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">{basics.headings?.skills ?? 'Skills'}</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2 text-sm font-medium transition-transform duration-200 hover:scale-105">
              <Icon name={skill.icon} className="h-4 w-4" />
              <span>{skill.name}</span>
            </Badge>
          )
        )}
      </div>
    </section>
  );
}
