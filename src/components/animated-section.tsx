
"use client";

import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

/**
 * Componente contenedor que aplica una animación cuando entra en el viewport.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido a animar.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} El elemento JSX que representa la sección animada.
 */
export function AnimatedSection({ children, className }: { children: React.ReactNode, className?: string }) {
  // Usamos el hook useInView para detectar si el componente está en la pantalla.
  const [ref, isInView] = useInView({
    threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
    triggerOnce: true, // La animación solo se ejecuta una vez
  });

  return (
    <div
      ref={ref}
      // Aplicamos la clase de animación solo cuando el elemento está en la vista.
      // 'opacity-0' lo mantiene invisible hasta que se activa la animación.
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
