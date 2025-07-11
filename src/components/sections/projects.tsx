"use client";

// Importaciones del hook del CV, componentes de UI, íconos y el componente Image de Next.js.
import { useCV } from "../cv-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

/**
 * Componente que muestra la sección de proyectos del CV.
 * @returns {JSX.Element | null} El elemento JSX de la sección o null si no hay proyectos.
 */
export function ProjectsSection() {
  // Obtiene los datos de los proyectos del contexto del CV.
  const { data } = useCV();
  const { projects } = data;

  // Si no hay proyectos o la lista está vacía, no renderiza la sección.
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    // Define la sección con un id para navegación y un margen para el anclaje del scroll.
    <section id="projects" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">Projects</h2>
      {/* Grid para mostrar los proyectos en columnas. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filtra los proyectos para mostrar solo los que están activos y los mapea a componentes Card. */}
        {projects.filter(p=>p.isActive).map((project, index) => (
          <Card key={index} className="flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-card">
            {/* Cabecera de la tarjeta con el título y la descripción del proyecto. */}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
              {project.description && <CardDescription>{project.description}</CardDescription>}
            </CardHeader>
            {/* Contenido de la tarjeta con los puntos destacados del proyecto. */}
            <CardContent className="flex-grow">
               {project.highlights && project.highlights.length > 0 && (
                 <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                 </ul>
               )}
            </CardContent>
            {/* Pie de la tarjeta con un botón para ver el proyecto. */}
            <CardFooter>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full">
                    View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
