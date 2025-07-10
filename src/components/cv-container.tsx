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
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
      <div className="flex min-h-screen w-full bg-background">
        <CVSidebar className="hidden lg:flex" />
        <main className="flex-1 p-4 lg:p-8">
          <div className="lg:hidden mb-4 flex items-center justify-between">
             <h1 className="text-2xl font-headline text-primary">{data.personalInfo.name}</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <CVSidebar />
              </SheetContent>
            </Sheet>
          </div>
          <div className="mx-auto max-w-4xl space-y-12">
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
          </div>
        </main>
      </div>
      <CommandPalette />
    </CVContext.Provider>
  );
}
