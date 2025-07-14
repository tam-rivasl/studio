
"use client";
import Image from 'next/image';
import type { ImageProps } from 'next/image';

/**
 * Componente Icon unificado que carga un SVG desde la carpeta public/icons.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del icono (debe coincidir con el nombre del archivo SVG).
 * @param {number} props.size - Tamaño del icono (se usa para width y height).
 */
export const Icon = ({ name, size = 24, className, ...props }: { name?: string; size?: number; } & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) => {
  if (!name) return null;
    console.log("icon: ", Icon.name, "name: ", name, "size: ", size)
    console.log(`/icons/${name.toLowerCase()}.svg`)
  return (
    <Image
      src={`icons/${name.toLowerCase()}.svg`}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
};
