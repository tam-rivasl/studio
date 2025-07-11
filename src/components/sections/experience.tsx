"use client";

// Importa el hook personalizado para acceder al contexto del CV.
import { useCV } from "../cv-container";

/**
 * Componente que muestra la sección de experiencia laboral del CV.
 * @returns {JSX.Element} El elemento JSX de la sección de experiencia.
 */
export function ExperienceSection() {
  // Obtiene los datos del trabajo del contexto del CV.
  const { data } = useCV();
  const { work } = data;

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

  return (
    // Define la sección con un id para navegación y un margen para el anclaje del scroll.
    <section id="experience" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {/* Itera sobre cada experiencia laboral y la renderiza. */}
        {work.map((job, index) => (
          // Contenedor de cada item de experiencia con un estilo de línea de tiempo.
          <div key={index} className="relative pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {/* Círculo en la línea de tiempo que marca el inicio del item. */}
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-background"></div>
            
            {/* Fechas de inicio y fin. */}
            <p className="text-sm text-muted-foreground mb-1">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
            {/* Cargo y nombre de la empresa con un enlace. */}
            <h3 className="text-xl font-semibold">{job.position} @ <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{job.name}</a></h3>
            {/* Ubicación y tipo de ubicación. */}
            <p className="text-md text-muted-foreground mb-3">{job.location}, {job.location_type}</p>
            
            {/* Renderizado condicional del resumen del trabajo. */}
            {job.summary && (
                <>
                    <h4 className="font-semibold text-md mb-1">Summary:</h4>
                    <p className="text-base text-muted-foreground mb-4">{job.summary}</p>
                </>
            )}

            {/* Renderizado condicional de las responsabilidades. */}
            {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                    <h4 className="font-semibold text-md mb-1">Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground mb-4">
                        {job.responsibilities.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </>
            )}

             {/* Renderizado condicional de los logros. */}
             {job.achievements && job.achievements.length > 0 && (
                <>
                    <h4 className="font-semibold text-md mb-1">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                        {job.achievements.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
