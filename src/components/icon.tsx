
"use client";
import React from 'react';
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconName = keyof typeof LucideIcons;

// Mapa de SVGs personalizados para logos que no están en Lucide o necesitan un diseño específico.
// fill="currentColor" permite que el color se herede del texto circundante.
const customSvgLogos: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  docker: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.12 6.13c-1.3-1.32-3.41-2.2-5.7-2.2H8.08c-1.07 0-2.09.28-2.98.78v.25c.03-.09.06-.17.1-.25.2-.42.46-.81.79-1.15C7.3.36 9.03 0 11.02 0h5.41c2.29 0 4.4 1.13 5.69 2.94.34.48.61 1.02.79 1.58.1.28.18.57.24.87.05.22.08.45.1.68.02.2-.02.39-.02.58v-.02c.02.16.04.32.04.49 0 .21-.02.43-.05.64-.04.28-.09.55-.16.82-.07.28-.16.55-.26.82-.19.51-.43 1-.72 1.45l5.24 2.25c.16-.6.26-1.22.26-1.85 0-.82-.13-1.62-.38-2.37zM8.88 15.13H5.82v-3.06h3.06v3.06zm4.19 0h-3.06v-3.06h3.06v3.06zm4.18 0h-3.06v-3.06h3.06v3.06zm4.19 0h-3.06v-3.06h3.06v3.06zm-12.56 4.19h3.06v-3.06H8.88v3.06zm4.19 0h-3.06v-3.06h3.06v3.06zm4.18 0h-3.06v-3.06h3.06v3.06zm0-8.37H1.63V8.88c.03-1.21.3-2.38.79-3.46.88-1.9 2.45-3.32 4.4-4.01.2-.07.4-.13.61-.19.06.03.12.06.18.08H1.74c-.39 0-.7.31-.7.7v16.25c0 .39.31.7.7.7h19.5c.39 0 .7-.31.7-.7V15.13h-4.05v4.19zM8.88 10.94H5.82V7.88h3.06v3.06zm4.19 0h-3.06V7.88h3.06v3.06zm4.18 0h-3.06V7.88h3.06v3.06z"/>
    </svg>
  ),
  gitlab: (props) => (
    <svg {...props} viewBox="0 0 128 128" fill="currentColor">
      <path d="M124.58 58.24 69.76 3.42a11.6 11.6 0 0 0-16.37 0l-8.18 8.19 14.36 14.36a9.08 9.08 0 0 1 11.55 11.55l13.9 13.9a9.08 9.08 0 1 1-4.06 4.06L67.11 41.58v28.45a9.08 9.08 0 1 1-5.75-.26V41.15a9.08 9.08 0 0 1-4.54-11.95L42.58 14.84 3.42 53.99a11.6 11.6 0 0 0 0 16.37l54.81 54.81a11.6 11.6 0 0 0 16.37 0l49.98-49.98a11.6 11.6 0 0 0 0-16.37z"/>
    </svg>
  ),
  nestjs: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
       <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,12,2Zm5.68,14.34a.27.27,0,0,1-.39,0L12,11.23,6.71,16.34a.27.27,0,0,1-.39,0L3.68,13.7a.27.27,0,0,1,0-.39L7.42,9.57,3.68,5.83a.27.27,0,0,1,0-.39L6.32,2.8a.27.27,0,0,1,.39,0L12,7.91l5.29-5.11a.27.27,0,0,1,.39,0L20.32,5.44a.27.27,0,0,1,0,.39L16.58,9.57l3.74,3.74a.27.27,0,0,1,0,.39Z"/>
    </svg>
  ),
};

/**
 * Componente Icon unificado.
 * Prioriza la búsqueda de un SVG personalizado en `customSvgLogos`.
 * Si no lo encuentra, busca un icono en la librería `lucide-react`.
 * Si tampoco lo encuentra, renderiza un icono de `FileCode` por defecto.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.name - Nombre del icono a renderizar (ej. 'docker', 'Github').
 * @param {string} [props.className] - Clases CSS para aplicar al icono.
 * @param {number} [props.size] - Tamaño del icono.
 */
export const Icon = ({ name, className, size=24, ...props }: { name?: string; } & Omit<LucideProps, 'name'>) => {
  if (!name) return null;

  const normalizedName = name.toLowerCase();
  
  if (customSvgLogos[normalizedName]) {
    const CustomIcon = customSvgLogos[normalizedName];
    return <CustomIcon className={className} width={size} height={size} {...props} />;
  }
  
  // Intenta encontrar el icono en Lucide, capitalizando la primera letra para coincidir con los nombres de componentes.
  const lucideName = name.charAt(0).toUpperCase() + name.slice(1) as IconName;
  const IconComponent = LucideIcons[lucideName];

  if (IconComponent) {
    return <IconComponent className={className} size={size} {...props} />;
  }

  // Fallback a un icono genérico si no se encuentra en ningún lado.
  return <LucideIcons.FileCode className={className} size={size} {...props} />;
};
