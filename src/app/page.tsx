
"use client";

// Importaciones de React, componentes y tipos necesarios.
import { useState, useEffect } from "react";
import { CVContainer } from "@/components/cv-container";
import type { CVData } from "@/lib/types";
// Importación de los datos del CV en inglés y español desde archivos JSON.
import enData from "@/data/en.json";
import esData from "@/data/es.json";
import { SnakePreloader } from "@/components/snake-preloader";

/**
 * La función Home es el componente principal de la página de inicio.
 * Gestiona el estado de carga y muestra un preloader antes del contenido principal.
 * @returns {JSX.Element} El elemento JSX que representa la página de inicio.
 */
export default function Home() {
  // Se realiza un casting de los datos importados para que coincidan con la interfaz CVData.
  const typedEnData: CVData = enData as unknown as CVData;
  const typedEsData: CVData = esData as unknown as CVData;

  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
     setTimeout(() => setLoading(false), 500); // Pequeño delay para la transición
  };

  return (
    <>
      {loading ? (
        <SnakePreloader onComplete={handleLoadingComplete} />
      ) : (
        <div className="animate-fade-in-up">
          <CVContainer data={{ en: typedEnData, es: typedEsData }} />
        </div>
      )}
    </>
  );
}
