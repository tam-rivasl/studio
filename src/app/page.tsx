import fs from "fs/promises";
import path from "path";
import { CVContainer } from "@/components/cv-container";
import type { CVData } from "@/lib/types";

async function getCVData(lang: "en" | "es"): Promise<CVData> {
  const filePath = path.join(process.cwd(), `src/data/${lang}.json`);
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Could not read or parse ${lang}.json`, error);
    // Return a default structure to prevent crash on build/render
    return {
      personalInfo: {
        name: "Error Loading Data",
        title: "Please check the data source.",
        location: "",
        email: "",
        socials: [],
        about: "There was an issue loading the content for this section.",
      },
      sections: {
        about: "About",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
        projects: "Projects",
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
    };
  }
}

export default async function Home() {
  const [enData, esData] = await Promise.all([
    getCVData("en"),
    getCVData("es"),
  ]);

  return <CVContainer data={{ en: enData, es: esData }} />;
}
