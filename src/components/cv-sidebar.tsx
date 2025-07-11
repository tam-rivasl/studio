"use client";

// Importaciones de Next.js, React, hooks y componentes.
import Image from "next/image";
import { Mail, Phone, MapPin, Download, Briefcase } from "lucide-react";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutSection } from "./sections/about";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";

// Define un tipo para los nombres de los íconos de Lucide para el renderizado dinámico.
type IconName = keyof typeof LucideIcons;

/**
 * Componente para renderizar un ícono de Lucide dinámicamente.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - El nombre del ícono a renderizar.
 * @returns {JSX.Element} El componente del ícono o un ícono por defecto.
 */
const DynamicIcon = ({ name }: { name: string }) => {
    // Capitaliza el nombre del ícono para que coincida con la exportación de Lucide.
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const iconName = capitalized as IconName;
    const IconComponent = LucideIcons[iconName];

    // Maneja casos especiales o devuelve un ícono de enlace por defecto si no se encuentra.
    if (!IconComponent) {
        if (capitalized === 'Github') return <LucideIcons.Github className="h-4 w-4" />;
        return <LucideIcons.Link className="h-4 w-4" />;
    }
    return <IconComponent className="h-4 w-4" />;
};


/**
 * Componente de la barra lateral del CV.
 * Muestra la información personal básica y los controles de la aplicación.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element | null} El elemento JSX de la barra lateral o null si no hay datos.
 */
export function CVSidebar({className}: {className?: string}) {
  // Obtiene los datos del CV del contexto.
  const { data } = useCV();

  // Si no hay datos, no renderiza nada para evitar errores.
  if (!data || !data.basics) {
    return null;
  }

  const { basics } = data;

  return (
    // Contenedor de la barra lateral con posición pegajosa en pantallas grandes.
    <aside className={cn("lg:sticky top-12 space-y-8", className)}>
      <div>
        {/* Imagen de perfil */}
        <Image 
          src={"https://placehold.co/200x200.png"}
          data-ai-hint="avatar"
          alt={basics.name}
          width={150}
          height={150}
          className="rounded-lg shadow-lg mb-4"
        />
        {/* Nombre y profesión */}
        <h1 className="text-3xl font-bold">{basics.name}</h1>
        <p className="text-lg text-primary">{basics.label}</p>
        
        {/* Información de contacto */}
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{basics.location.city}, {basics.location.region}</span>
            </div>
             <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${basics.email}`} className="hover:text-foreground transition-colors">{basics.email}</a>
            </div>
             <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{basics.phone}</span>
            </div>
        </div>

        {/* Perfiles sociales */}
        <div className="flex justify-start gap-2 pt-4">
          {basics.profiles.map(social => (
              <a href={social.url} key={social.network} target="_blank" rel="noopener noreferrer" aria-label={social.network}>
                  <Button variant="outline" size="icon" className="text-muted-foreground hover:text-foreground">
                      <DynamicIcon name={social.network}/>
                  </Button>
              </a>
          ))}
        </div>
      </div>
      
      {/* Sección "Sobre mí" */}
      <AboutSection />

      {/* Controles de la aplicación */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
        {/* El botón de la paleta de comandos se muestra aquí */}
        <CommandPalette className="relative bottom-auto right-auto z-auto shadow-none" />
      </div>
    </aside>
  );
}
