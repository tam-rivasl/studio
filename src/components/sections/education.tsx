"use client";

// Importaciones del hook del CV y de los íconos.
import { useCV } from "../cv-container";
import { Building } from "lucide-react";

/**
 * Componente que muestra la sección de educación del CV.
 * @returns {JSX.Element | null} El elemento JSX de la sección o null si no hay datos de educación.
 */
export function EducationSection() {
  // Obtiene los datos del CV del contexto.
  const { data } = useCV();
  const { education } = data;

  // Si no hay datos de educación, no renderiza la sección.
  if (!education || education.length === 0) {
    return null;
  }

  /**
   * Formatea una fecha. Si la fecha es nula, devuelve 'Present'.
   * @param {string | null} date - La fecha a formatear.
   * @returns {string} La fecha formateada o 'Present'.
   */
  const formatDate = (date: string | null) => {
    if (!date) return 'Present';
    return date;
  }

  return (
    // Define la sección con un id para la navegación y un margen para el scroll.
    <section id="education" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">Education</h2>
      <div className="space-y-6">
        {/* Itera sobre cada elemento de educación y lo muestra. */}
        {education.map((edu, index) => (
          <div key={index}>
             {/* Contenedor para el título y las fechas. */}
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.area}</h3>
                 <p className="text-sm text-muted-foreground">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
            {/* Contenedor para la institución. */}
            <div className="flex items-center gap-2 text-md text-muted-foreground">
                <Building className="h-4 w-4 text-primary" />
                <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{edu.institution}</a>
            </div>
            {/* Tipo de estudio. */}
            <p className="text-sm text-muted-foreground mt-1">{edu.studyType}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
