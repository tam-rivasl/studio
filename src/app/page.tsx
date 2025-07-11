import { CVContainer } from "@/components/cv-container";
import type { CVData } from "@/lib/types";
import enData from "@/data/en.json";
import esData from "@/data/es.json";


export default async function Home() {
  const typedEnData: CVData = enData as unknown as CVData;
  const typedEsData: CVData = esData as unknown as CVData;

  return <CVContainer data={{ en: typedEnData, es: typedEsData }} />;
}
