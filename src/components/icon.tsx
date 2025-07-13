// Importaciones de React y de la librería de iconos Lucide.
"use client";
import type { LucideProps } from "lucide-react";
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Componente Icon unificado.
 * Renderiza un icono SVG desde la carpeta `public/icons`.
 * @param {object} props -   Propiedades del componente.
 * @param {string | undefined} props.name - Nombre del archivo del icono (sin .svg).
 * @param {number} props.size - Tamaño del icono (width y height).
 * @returns {JSX.Element} El componente del icono.
 */
export const Icon = ({ name, alt, size = 24, ...props }: { name?: string; alt?: string, size?: number } & Omit<LucideProps, 'name'>) => {
    if (!name) {
      return null;
    }

  return (
    <Image 
      src={`/icons/${name}.svg`} 
      alt={alt || `${name} icon`} 
      width={size}
      height={size}
      {...props} 
    />
  );
};
