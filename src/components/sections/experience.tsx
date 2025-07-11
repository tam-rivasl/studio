"use client";

// Importa el hook personalizado para acceder al contexto del CV y el hook useState de React.
import { useCV } from "../cv-container";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Componente que muestra la sección de experiencia laboral del CV.
 * @returns {JSX.Element} El elemento JSX de la sección de experiencia.
 */
export function ExperienceSection() {
  // Obtiene los datos del trabajo del contexto del CV.
  const { data } = useCV();
  const { work } = data;

  // Estado para gestionar qué tarjetas de experiencia están expandidas.
  // Es un objeto donde la clave es el índice del trabajo y el valor es un booleano.
  const [expandedJobs, setExpandedJobs] = useState<{ [key: number]: boolean }>({});

  /**
   * Función para alternar el estado de expansión de una tarjeta de trabajo específica.
   * @param {number} index - El índice del trabajo a expandir/contraer.
   */
  const toggleExpanded = (index: number) => {
    setExpandedJobs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  /**
   * Formatea una fecha en formato 'Mes Año'. Si la fecha es nula, devuelve 'Present'.
   * Se especifica 'timeZone: 'UTC'' para evitar errores de hidratación entre servidor y cliente.
   * @param {string | null} date - La cadena de fecha a formatear.
   * @returns {string} La fecha formateada.
   */
  const formatDate = (date: string | null) => {
    if (!date) return 'Present';
    const d = new Date(date);
    // Usar una configuración regional específica (en-US) y UTC asegura consistencia.
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
  }

  // Límite de elementos a mostrar cuando la sección está contraída.
  const PREVIEW_LIMIT = 2;

  return (
    // Define la sección con un id para navegación y un margen para el anclaje del scroll.
    <section id="experience" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">Experience</h2>
      <div className="space-y-8">
        {/* Itera sobre cada experiencia laboral y la renderiza. */}
        {work.map((job, index) => {
          const isExpanded = expandedJobs[index];
          const responsibilities = job.responsibilities || [];
          const achievements = job.achievements || [];

          // Determina si se debe mostrar el botón "Mostrar más/menos".
          const showToggleButton = responsibilities.length > PREVIEW_LIMIT || achievements.length > PREVIEW_LIMIT;

          return (
            // Contenedor de cada item de experiencia con un estilo de línea de tiempo.
            <div key={index} className="relative pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-border">
              {/* Círculo en la línea de tiempo que marca el inicio del item. */}
              <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
              
              {/* Fechas de inicio y fin. */}
              <p className="text-sm text-muted-foreground mb-1">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
              {/* Cargo y nombre de la empresa con un enlace. */}
              <h3 className="text-xl font-semibold">{job.position} @ <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{job.name}</a></h3>
              {/* Ubicación y tipo de ubicación. */}
              <p className="text-md text-muted-foreground mb-3">{job.location}, {job.location_type}</p>
              
              {/* Renderizado condicional del resumen del trabajo. */}
              {job.summary && (
                  <>
                      <h4 className="font-semibold text-md mb-1 text-primary/80">Summary:</h4>
                      <p className="text-base text-muted-foreground mb-4">{job.summary}</p>
                  </>
              )}

              {/* Renderizado condicional de las responsabilidades. */}
              {responsibilities.length > 0 && (
                  <>
                      <h4 className="font-semibold text-md mb-1 text-primary/80">Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground mb-4">
                          {(isExpanded ? responsibilities : responsibilities.slice(0, PREVIEW_LIMIT)).map((desc, i) => <li key={i}>{desc}</li>)}
                      </ul>
                  </>
              )}

               {/* Renderizado condicional de los logros. */}
               {achievements.length > 0 && (
                  <>
                      <h4 className="font-semibold text-md mb-1 text-primary/80">Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                          {(isExpanded ? achievements : achievements.slice(0, PREVIEW_LIMIT)).map((desc, i) => <li key={i}>{desc}</li>)}
                      </ul>
                  </>
              )}

              {/* Botón para mostrar más o menos. */}
              {showToggleButton && (
                <Button variant="link" onClick={() => toggleExpanded(index)} className="p-0 h-auto text-primary">
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  );
}
