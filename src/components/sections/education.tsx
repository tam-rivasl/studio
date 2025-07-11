"use client";

import { useCV } from "../cv-container";
import { Building, Calendar } from "lucide-react";

export function EducationSection() {
  const { data } = useCV();
  const { education } = data;

  if (!education || education.length === 0) {
    return null;
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Present';
    return date;
  }

  return (
    <section id="education" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index}>
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.area}</h3>
                 <p className="text-sm text-muted-foreground">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
            <div className="flex items-center gap-2 text-md text-muted-foreground">
                <Building className="h-4 w-4" />
                <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{edu.institution}</a>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{edu.studyType}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
