"use client";

// Importaciones de React, tipos y componentes.
import React, { useState, createContext, useContext } from "react";
import type { CVData } from "@/lib/types";
import { CVSidebar } from "@/components/cv-sidebar";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { CommandPalette } from "./command-palette";

// Define los idiomas soportados.
type Language = "en" | "es";

// Define la estructura del contexto del CV.
interface CVContextType {
  lang: Language; // Idioma actual.
  setLang: React.Dispatch<React.SetStateAction<Language>>; // Función para cambiar el idioma.
  data: CVData; // Datos del CV para el idioma actual.
}

// Crea el contexto del CV.
const CVContext = createContext<CVContextType | null>(null);

/**
 * Hook personalizado para acceder al contexto del CV.
 * Proporciona una forma sencilla de que los componentes hijos accedan a los datos y funciones del CV.
 * @throws {Error} Si se usa fuera de un CVContainer.
 * @returns {CVContextType} El contexto del CV.
 */
export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVContainer");
  }
  return context;
}

/**
 * Componente contenedor principal del CV.
 * Gestiona el estado del idioma y proporciona los datos del CV a través de un contexto.
 * @param {object} props - Propiedades del componente.
 * @param {{ en: CVData; es: CVData }} props.data - Objeto con los datos del CV en inglés y español.
 * @returns {JSX.Element} El elemento JSX que representa el contenedor del CV.
 */
export function CVContainer({ data: allData }: { data: { en: CVData; es: CVData } }) {
  // Estado para gestionar el idioma actual, por defecto 'en'.
  const [lang, setLang] = useState<Language>("en");
  // Selecciona los datos del CV basados en el idioma actual.
  const data = allData[lang];

  // Si no hay datos, muestra un mensaje de carga para evitar errores.
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    // Proveedor de contexto que pasa el idioma, la función para cambiarlo y los datos actuales.
    <CVContext.Provider value={{ lang, setLang, data }}>
       {/* Contenedor principal con fondo y padding. */}
       <div className="min-h-screen bg-background p-4 sm:p-8 md:p-12">
        {/* Grid para el diseño de dos columnas en pantallas grandes. */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Barra lateral pegajosa con la información principal. */}
          <CVSidebar />
          {/* Contenido principal con las diferentes secciones del CV. */}
          <main className="lg:col-span-2 space-y-12">
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
          </main>
        </div>
      </div>
      {/* La paleta de comandos se añade aquí, pero podría estar oculta por defecto. */}
      <CommandPalette />
    </CVContext.Provider>
  );
}
