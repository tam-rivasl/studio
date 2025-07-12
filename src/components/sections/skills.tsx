"use client";

import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconName = keyof typeof LucideIcons;

const LucideIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = LucideIcons[name as IconName];
  if (!IconComponent) {
    // Si no se encuentra un ícono, se muestra uno por defecto.
    return <LucideIcons.FileCode {...props} />;
  }
  return <IconComponent {...props} />;
};

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
              {skill.icon && <LucideIcon name={skill.icon} className="h-4 w-4" />}
              <span>{skill.name}</span>
            </Badge>
          )
        )}
      </div>
    </section>
  );
}
