// Importaciones de componentes y tipos necesarios.
import { CVContainer } from "@/components/cv-container";
import type { CVData } from "@/lib/types";
// Importación de los datos del CV en inglés y español desde archivos JSON.
import enData from "@/data/en.json";
import esData from "@/data/es.json";

/**
 * La función Home es el componente principal de la página de inicio.
 * Es una función asíncrona porque en un futuro podría obtener datos de una API.
 * @returns {Promise<JSX.Element>} El elemento JSX que representa la página de inicio.
 */
export default async function Home() {
  // Se realiza un casting de los datos importados para que coincidan con la interfaz CVData.
  // Esto asegura que los datos tengan la estructura esperada por los componentes.
  const typedEnData: CVData = enData as unknown as CVData;
  const typedEsData: CVData = esData as unknown as CVData;

  // Se renderiza el componente CVContainer, pasándole los datos en ambos idiomas.
  return <CVContainer data={{ en: typedEnData, es: typedEsData }} />;
}
