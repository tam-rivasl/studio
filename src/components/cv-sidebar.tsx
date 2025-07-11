
"use client";

// Importaciones de Next.js, React, hooks y componentes.
import Image from "next/image";
import { Mail, Phone, MapPin, Download, Briefcase, Linkedin, Github } from "lucide-react";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AboutSection } from "./sections/about";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";

/**
 * Componente que renderiza un ícono de Lucide dinámicamente.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - El nombre del ícono a renderizar.
 * @returns {JSX.Element} El componente del ícono o un ícono por defecto.
 */
const DynamicIcon = ({ name }: { name: string }) => {
    // Maneja casos especiales o devuelve un ícono de enlace por defecto si no se encuentra.
    if (name.toLowerCase() === 'linkedin') return <Linkedin className="h-4 w-4" />;
    if (name.toLowerCase() === 'github') return <Github className="h-4 w-4" />;
    return <Briefcase className="h-4 w-4" />;
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
          className="rounded-full shadow-lg mb-4"
        />
        {/* Nombre y profesión */}
        <h1 className="text-3xl font-bold">{basics.name}</h1>
        <p className="text-xl text-primary font-body">{basics.label}</p>
        
        {/* Información de contacto */}
        <div className="mt-4 space-y-2 text-sm text-muted-foreground font-body">
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

        {/* Controles de la aplicación */}
        <div className="flex items-center gap-2 mt-4">
          <LanguageToggle />
          <ThemeToggle />
          <CommandPalette />
        </div>
      </div>
      
      {/* Sección "Sobre mí" */}
      <AboutSection />

      {/* Perfiles sociales */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-display">Social</h2>
        {basics.profiles.map(social => (
            <a href={social.url} key={social.network} target="_blank" rel="noopener noreferrer" aria-label={social.network} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body">
                <DynamicIcon name={social.network}/>
                <span>{social.network}</span>
            </a>
        ))}
      </div>
    </aside>
  );
}

