
"use client";

// Importaciones de React, componentes y tipos necesarios.
import { useState } from "react";
import { CVContainer } from "@/components/cv-container";
import type { CVData } from "@/lib/types";
// Importación de los datos del CV desde un único punto.
import { cvData } from "@/data";
import type { LanguageCode } from "@/data";
import { SnakePreloader } from "@/components/snake-preloader";
import { cn } from "@/lib/utils";

/**
 * La función Home es el componente principal de la página de inicio.
 * Gestiona el estado de carga y muestra un preloader antes del contenido principal.
 * @returns {JSX.Element} El elemento JSX que representa la página de inicio.
 */
export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
     setTimeout(() => setLoading(false), 500); // Pequeño delay para la transición
  };

  const typedCvData = cvData as Record<LanguageCode, CVData>;

  return (
    <>
      <div className={loading ? 'block' : 'hidden'}>
        <SnakePreloader onComplete={handleLoadingComplete} />
      </div>

      <div className={cn("animate-fade-in-up", loading ? 'hidden' : 'block')}>
          <CVContainer data={typedCvData} />
      </div>
    </>
  );
}
