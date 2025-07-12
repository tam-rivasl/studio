"use client";
// Importa el hook personalizado para acceder a los datos del CV.
import { useCV } from "../cv-container";

/**
 * Componente que muestra la sección "Sobre mí" del CV.
 * Utiliza los datos del contexto proporcionado por CVContainer.
 * @returns {JSX.Element} El elemento JSX que representa la sección.
 */
export function AboutSection() {
  // Obtiene los datos del CV del contexto.
  const { data } = useCV();
  const { basics } = data;

  return (
    // Define la sección con un id para la navegación y un margen superior para el scroll.
    <section id="about" className="scroll-mt-20">
      {/* Título de la sección. */}
       <h2 className="text-2xl font-bold mb-4 text-primary">{basics.headings?.about ?? 'About'}</h2>
      {/* Párrafo con el resumen del perfil, obtenido de los datos del CV. */}
      <p className="text-base leading-relaxed text-muted-foreground text-justify">{basics.summary}</p>
    </section>
  );
}
