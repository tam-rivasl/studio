"use client";

// Importaciones de React, hooks y componentes de la UI.
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
// Importación de íconos de Lucide React.
import {
  Home,
  Briefcase,
  GraduationCap,
  Lightbulb,
  FolderGit2,
  Printer,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

// Se define un tipo para los nombres de los íconos de Lucide.
type IconName = keyof typeof LucideIcons;

/**
 * Componente para renderizar un ícono de Lucide dinámicamente a partir de un string.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del ícono a renderizar.
 * @returns {JSX.Element} El componente del ícono.
 */
const DynamicIcon = ({ name }: { name: string }) => {
    // Capitaliza el nombre para que coincida con los nombres de componentes de Lucide.
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const iconName = capitalized as IconName;
    const IconComponent = LucideIcons[iconName];
    // Si el ícono no existe, devuelve un ícono por defecto.
    if (!IconComponent) return <Home className="h-4 w-4" />;
    return <IconComponent className="h-4 w-4" />;
};


/**
 * Componente que muestra una paleta de comandos para navegación y acciones rápidas.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} El elemento JSX de la paleta de comandos.
 */
export function CommandPalette({className}: {className?: string}) {
  // Estado para controlar la visibilidad de la paleta de comandos.
  const [open, setOpen] = useState(false);
  // Hook para cambiar el tema de la aplicación.
  const { setTheme } = useTheme();
  // Hook personalizado para acceder a los datos y funciones del CV.
  const { data, setLang } = useCV();
  // Estado para detectar si el sistema operativo es macOS.
  const [isMac, setIsMac] = useState(false);

  // Efecto para detectar el sistema operativo del cliente.
  useEffect(() => {
    setIsMac(window.navigator.userAgent.includes("Mac"));
  }, []);

  // Efecto para añadir un event listener para el atajo de teclado (⌘K o Ctrl+K).
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    // Limpieza del event listener cuando el componente se desmonta.
    return () => document.removeEventListener("keydown", down);
  }, []);

  /**
   * Función para ejecutar un comando y cerrar la paleta.
   * Se usa `useCallback` para memorizar la función y evitar re-renders innecesarios.
   */
  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  // Genera dinámicamente los comandos para los perfiles sociales.
  const socialCommands = data.basics.profiles.map((social) => ({
    name: `Visit ${social.network}`,
    icon: <DynamicIcon name={social.network} />,
    action: () => window.open(social.url, "_blank"),
  }));

  // Define los comandos de navegación.
  const navigationCommands = [
    { name: "About", href: "#about", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="mr-2 h-4 w-4" /> },
    { name: "Education", href: "#education", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
    { name: "Skills", href: "#skills", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
    { name: "Projects", href: "#projects", icon: <FolderGit2 className="mr-2 h-4 w-4" /> },
  ];
  
  // Define los comandos de acciones con sus atajos de teclado.
  const actionCommands = [
    {
      name: "Print CV",
      icon: <Printer className="mr-2 h-4 w-4" />,
      action: () => window.print(),
      shortcut: "⌘P"
    },
    ...socialCommands,
  ];

  // Define los comandos de cambio de tema con sus atajos de teclado.
  const themeCommands = [
      { name: "Light", action: () => setTheme("light"), icon: <Sun className="mr-2 h-4 w-4" />, shortcut: "T L" },
      { name: "Dark", action: () => setTheme("dark"), icon: <Moon className="mr-2 h-4 w-4" />, shortcut: "T D" },
      { name: "System", action: () => setTheme("system"), icon: <Laptop className="mr-2 h-4 w-4" />, shortcut: "T S" }
  ];

  // Define los comandos de cambio de idioma.
  const languageCommands = [
      { name: "English", action: () => setLang("en"), shortcut: "L E" },
      { name: "Español", action: () => setLang("es"), shortcut: "L S" }
  ];

  return (
    <>
      {/* Botón para abrir la paleta de comandos. */}
      <Button
        variant="outline"
        className={cn("fixed bottom-4 right-4 z-50 shadow-lg", className)}
        onClick={() => setOpen(true)}
      >
        <span className="font-sans text-xs">{isMac ? "⌘K" : "Ctrl+K"}</span>
      </Button>
      {/* Dialogo de la paleta de comandos. */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* Grupo de comandos de navegación. */}
          <CommandGroup heading="Navigation">
            {navigationCommands.map((nav) => (
                <CommandItem key={nav.href} onSelect={() => runCommand(() => (window.location.href = nav.href))}>
                    {nav.icon}
                    <span>{nav.name}</span>
                </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          {/* Grupo de comandos de acciones. */}
          <CommandGroup heading="Actions">
            {actionCommands.map((cmd) => (
                <CommandItem key={cmd.name} onSelect={() => runCommand(cmd.action)}>
                    {cmd.icon}
                    <span>{cmd.name}</span>
                    {cmd.shortcut && (
                      <CommandShortcut>
                        {cmd.shortcut.replace("⌘", isMac ? "⌘" : "Ctrl")}
                      </CommandShortcut>
                    )}
                </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          {/* Grupo de comandos para cambiar el tema. */}
          <CommandGroup heading="Theme">
            {themeCommands.map((cmd) => (
                <CommandItem key={cmd.name} onSelect={() => runCommand(cmd.action)}>
                    {cmd.icon}
                    <span>{cmd.name}</span>
                    {cmd.shortcut && <CommandShortcut>{cmd.shortcut}</CommandShortcut>}
                </CommandItem>
            ))}
          </CommandGroup>
           <CommandSeparator />
          {/* Grupo de comandos para cambiar el idioma. */}
          <CommandGroup heading="Language">
            {languageCommands.map((cmd) => (
              <CommandItem key={cmd.name} onSelect={() => runCommand(cmd.action)}>
                <span className="mr-2 w-4 text-center">{cmd.name === 'English' ? 'EN' : 'ES'}</span>
                <span>{cmd.name}</span>
                {cmd.shortcut && <CommandShortcut>{cmd.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
