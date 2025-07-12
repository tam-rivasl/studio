// Importaciones de React y de la librería de iconos Lucide.
"use client";
import type { LucideProps } from "lucide-react";
import Image from 'next/image';


/**
 * Componente Icon unificado.
 * Renderiza un icono basándose en un nombre.
 * Prioridad:
 * 1. Busca en el mapa de `customIcons`.
 * 2. Si no lo encuentra, busca en `lucide-react`.
 * 3. Si tampoco lo encuentra, muestra un icono por defecto (`FileCode`).
 * @param {object} props -   Propiedades del componente.
 * @param {string | undefined} props.name - Nombre del icono a renderizar.
 * @returns {JSX.Element} El componente del icono.
 */
export const Icon = ({ name, alt, ...props }: { name?: string } & Omit<LucideProps, 'name'> & React.ComponentProps<typeof Image>) => {
    if (!name) {
      return null;
    }

  return (
    <div style={{ width: props.size || 24, height: props.size || 24, position: 'relative' }}>
      <Image 
        src={`/icons/${name}.svg`} 
        alt={alt || `${name} icon`} 
        width={props.size as number || 24} 
        height={props.size as number || 24} 
        {...props} 
      />
    </div>
  );
};
