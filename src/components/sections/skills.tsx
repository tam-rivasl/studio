"use client";

// Importaciones del hook del CV y el componente Badge de la UI.
import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Un tipo para asegurar que solo pasamos nombres de íconos válidos de Lucide.
type IconName = keyof typeof LucideIcons;

// Componente para renderizar un ícono de Lucide dinámicamente.
const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = LucideIcons[name as IconName];

  if (!IconComponent) {
    // Devuelve un ícono por defecto si el nombre no es válido.
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};


/**
 * Componente que muestra la sección de habilidades del CV.
 * @returns {JSX.Element | null} El elemento JSX de la sección o null si no hay habilidades.
 */
export function SkillsSection() {
  // Obtiene los datos de las habilidades del contexto del CV.
  const { data } = useCV();
  const { skills } = data;

  // Si no hay habilidades o la lista está vacía, no renderiza la sección.
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    // Define la sección con un id para navegación y un margen para el anclaje del scroll.
    <section id="skills" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">Skills</h2>
      {/* Contenedor flexible que permite que las "badges" de habilidades se ajusten. */}
      <div className="flex flex-wrap gap-2">
        {/* Itera sobre cada habilidad y la muestra como un componente Badge. */}
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-2 text-sm font-medium transition-transform duration-200 hover:scale-105">
            {skill.icon && <DynamicIcon name={skill.icon} className="h-4 w-4" />}
            <span>{skill.name}</span>
          </Badge>
        ))}
      </div>
    </section>
  );
}
