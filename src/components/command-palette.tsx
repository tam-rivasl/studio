
"use client";

// Importaciones de React, hooks y componentes de la UI.
import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandItem,
} from "@/components/ui/command";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
// Importación de íconos de Lucide React.
import {
  Printer,
  Linkedin,
  Github,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * Componente Kbd para renderizar teclas de atajo con estilo.
 */
const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
        className
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";


/**
 * Componente que muestra una paleta de comandos para navegación y acciones rápidas.
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} El elemento JSX de la paleta de comandos.
 */
export function CommandPalette({ className }: { className?: string }) {
  // Estado para controlar la visibilidad de la paleta de comandos.
  const [open, setOpen] = useState(false);
  // Hook personalizado para acceder a los datos y funciones del CV.
  const { data } = useCV();
  // Estado para detectar si el sistema operativo es macOS.
  const [isMac, setIsMac] = useState(false);

  // Efecto para detectar el sistema operativo del cliente.
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(window.navigator.userAgent.includes("Mac"));
    }
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

  const actionCommands = [
    {
      name: "Print Resume",
      icon: <Printer className="mr-2 h-4 w-4" />,
      action: () => window.print(),
      shortcut: "P",
    },
  ];

  const socialCommands = [
    {
      name: "Visit LinkedIn",
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      action: () => window.open(data.basics.profiles.find(p => p.network.toLowerCase() === 'linkedin')?.url, "_blank"),
      shortcut: "L",
    },
    {
      name: "Visit GitHub",
      icon: <Github className="mr-2 h-4 w-4" />,
      action: () => window.open(data.basics.profiles.find(p => p.network.toLowerCase() === 'github')?.url, "_blank"),
      shortcut: "G",
    },
  ];
  
  return (
    <>
      {/* Botón para abrir la paleta de comandos. */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-8 w-8 transition-transform duration-300 hover:scale-110",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M10 3h4" />
          <path d="M12 14v7" />
          <path d="M17 5.14v1.57a12.98 12.98 0 0 1-5 2.29 12.98 12.98 0 0 1-5-2.29V5.14" />
          <path d="M7.14 6.71a7.5 7.5 0 0 0 9.72 0" />
        </svg>
        <span className="sr-only">Open command palette</span>
      </Button>
      {/* Dialogo de la paleta de comandos. */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Command</DialogTitle>
        <CommandInput placeholder="Search Command" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Grupo de comandos de acciones. */}
          <CommandGroup heading="Actions">
            {actionCommands.map((cmd) => (
              <CommandItem
                key={cmd.name}
                onSelect={() => runCommand(cmd.action)}
                className="font-body"
              >
                {cmd.icon}
                <span>{cmd.name}</span>
                {cmd.shortcut && (
                  <CommandShortcut>
                    <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                    <Kbd>{cmd.shortcut}</Kbd>
                  </CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          
          {/* Grupo de comandos sociales. */}
          <CommandGroup heading="Social">
            {socialCommands.map((cmd) => (
              <CommandItem
                key={cmd.name}
                onSelect={() => runCommand(cmd.action)}
                className="font-body"
              >
                {cmd.icon}
                <span>{cmd.name}</span>
                {cmd.shortcut && (
                  <CommandShortcut>
                    <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                    <Kbd>{cmd.shortcut}</Kbd>
                  </CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-between border-t p-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
                <Kbd><CornerDownLeft size={12}/></Kbd> to select
            </div>
            <div className="flex items-center gap-1">
                <Kbd><ArrowUp size={12}/></Kbd> <Kbd><ArrowDown size={12}/></Kbd> to navigate
            </div>
            <div className="flex items-center gap-1">
                <Kbd>{isMac ? "Cmd" : "Ctrl"} + K</Kbd> <Kbd>Escape</Kbd> to close
            </div>
        </div>
      </CommandDialog>
    </>
  );
}
