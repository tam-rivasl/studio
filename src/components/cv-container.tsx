"use client";

import React, { useState, createContext, useContext } from "react";
import type { CVData } from "@/lib/types";
import { CVSidebar } from "@/components/cv-sidebar";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { CommandPalette } from "./command-palette";

type Language = "en" | "es";

interface CVContextType {
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  data: CVData;
}

const CVContext = createContext<CVContextType | null>(null);

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVContainer");
  }
  return context;
}

export function CVContainer({ data: allData }: { data: { en: CVData; es: CVData } }) {
  const [lang, setLang] = useState<Language>("en");
  const data = allData[lang];

  return (
    <CVContext.Provider value={{ lang, setLang, data }}>
       <div className="min-h-screen bg-[#F0F5F0] p-4 sm:p-8 md:p-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <CVSidebar />
          <main className="lg:col-span-2 space-y-12">
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
          </main>
        </div>
      </div>
      <CommandPalette className="hidden" />
    </CVContext.Provider>
  );
}
