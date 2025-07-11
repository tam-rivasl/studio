"use client"

// Importaciones de React, íconos y el hook de next-themes.
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Importaciones de componentes de la UI.
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * Componente que renderiza un botón para cambiar el tema de la aplicación (claro, oscuro, sistema).
 * @returns {JSX.Element} El elemento JSX del interruptor de tema.
 */
export function ThemeToggle() {
  // Obtiene la función para cambiar el tema del hook useTheme.
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      {/* El disparador del menú desplegable es un botón con íconos de sol y luna. */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Ícono de sol, visible en tema claro. */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Ícono de luna, visible en tema oscuro. */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* Texto para lectores de pantalla. */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Contenido del menú desplegable. */}
      <DropdownMenuContent align="end">
        {/* Opción para cambiar a tema claro. */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        {/* Opción para cambiar a tema oscuro. */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* Opción para usar el tema del sistema. */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
