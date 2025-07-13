
"use client";

// Importaciones de Next.js, React, hooks y componentes.
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { AboutSection } from "./sections/about";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


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
  const { toast } = useToast();

  // Si no hay datos, no renderiza nada para evitar errores.
  if (!data || !data.basics) {
    return null;
  }

  const { basics } = data;

  const handleCopyPhone = () => {
    if (basics.phone) {
      navigator.clipboard.writeText(basics.phone);
      toast({
        title: "¡Copiado!",
        description: `El número ${basics.phone} ha sido copiado.`,
      });
    }
  };

  const contactItems = [
    ...(basics.email ? [{
      label: "Email",
      value: basics.email,
      href: `mailto:${basics.email}`,
      icon: <Mail className="h-4 w-4" />,
      action: () => {}
    }] : []),
    ...(basics.phone ? [{
      label: "Phone",
      value: basics.phone,
      icon: <Phone className="h-4 w-4" />,
      action: handleCopyPhone,
    }] : []),
    ...basics.profiles.map(profile => ({
      label: profile.network,
      value: profile.url,
      href: profile.url,
      icon: profile.network.toLowerCase() === 'linkedin' ? <Linkedin className="h-4 w-4" /> : <Github className="h-4 w-4" />,
      action: () => {}
    }))
  ];

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
        <h1 className="text-3xl font-bold font-heading">{basics.name}</h1>
        <p className="text-xl text-primary font-body">{basics.label}</p>
        
        {/* Información de ubicación */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground font-body">
            <MapPin className="h-4 w-4" />
            <span>{basics.location.city}, {basics.location.region}</span>
        </div>

        {/* Iconos de contacto */}
        <TooltipProvider>
          <div className="flex items-center gap-3 mt-4">
            {contactItems.map(item => (
               <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      target={item.href.startsWith('http') ? '_blank' : '_self'} 
                      rel="noopener noreferrer" 
                      aria-label={`Contact via ${item.label}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.icon}
                    </a>
                  ) : (
                    <button 
                      onClick={item.action} 
                      aria-label={`Copy ${item.label}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.icon}
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label === "Phone" ? "Copiar teléfono" : (item.href ? `Visitar ${item.label}`: item.label)}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Controles de la aplicación */}
        <div className="flex items-center gap-2 mt-6">
          <LanguageToggle />
          <ThemeToggle />
          <CommandPalette />
        </div>
      </div>
      
      {/* Sección "Sobre mí" */}
      <AboutSection />
    </aside>
  );
}
