// Importaciones de React y de la librería de iconos Lucide.
"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

// Tipos para asegurar que los nombres de los iconos sean válidos.
type IconName = keyof typeof LucideIcons;

// Un mapa que almacena componentes SVG personalizados para logos específicos.
// Esto nos permite usar iconos que no están disponibles en la librería Lucide.
const customIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  javascript: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#F7DF1E" d="M0 0h128v128H0z" />
      <path d="M41.734 108.573c2.937 2.146 6.828 3.427 10.938 3.427 4.792 0 8.333-1.625 8.333-5.521 0-3.75-3.281-5.104-8.854-7.292l-3.281-1.25c-7.917-3.021-13.125-8.594-13.125-17.5 0-9.583 7.5-16.979 18.229-16.979 4.948 0 9.271 1.25 12.396 3.125l-4.167 7.292c-2.292-1.458-5.104-2.396-8.229-2.396-3.75 0-6.146 1.771-6.146 4.688 0 3.281 2.396 4.688 7.396 6.771l3.281 1.25c9.375 3.542 14.896 8.906 14.896 18.229 0 10.833-8.021 17.917-20.208 17.917-6.51 0-12.188-2.146-16.25-5.208l4.375-7.187zM80.083 108.99c3.281 2.083 6.094 3.021 9.479 3.021 5.313 0 8.229-2.083 8.229-10.417V68h11.25v43.438c0 14.583-10.833 21.042-24.375 21.042-8.594 0-15.365-3.542-19.115-8.021l5.542-6.458z" />
    </svg>
  ),
  css: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#1572B6" d="M0 0h128v128H0z" />
      <path fill="#fff" d="m30.43 104.2-5.43-61.2h78l-2.1 23h-47.6l1.2 13.8h45l-5.6 34.4-18.1 5-17.8-5 1-13h-14.8l-2.6 30z" />
    </svg>
  ),
  typescript: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#007ACC" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M22 22h84v84H22z" />
      <path fill="#007ACC" d="M91.86 65.7h-9.33V94H69.64V65.7h-9.33V53h31.55v12.7zm-40.48 21.1c4.9 3.3 11 5.1 18.3 5.1 7.2 0 12.1-2.4 12.1-7.2 0-4.1-3.6-6.4-10.8-8.8l-2.4-1.2c-5.9-2.4-10-5.8-10-12.7 0-6.4 5-11.5 13.5-11.5 4.3 0 8.4.9 11.5 2.5l-3.2 10.6c-2.3-1.2-4.6-1.9-7.7-1.9-3.4 0-5.6 1.7-5.6 4.1 0 2.9 2.2 4.4 8.7 7.1l2.4 1.2c6.8 2.8 11.1 6.3 11.1 13.2 0 7.7-5.8 12.9-15.6 12.9-5.9 0-11.3-1.6-14.9-3.9l3.5-10.7z" />
    </svg>
  ),
  html: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#E44D26" d="M19 0l9 101 36 10 36-10 9-101H19z"/>
      <path fill="#F16529" d="M64 117l29-8 8-90H64v98z"/>
      <path fill="#EBEBEB" d="M64 52H43l-1-10h22V32H34l3 35h27v-15z"/>
      <path fill="#FFF" d="M64 52v15h20l-2 21-18 5v11l29-8 4-47H64z"/>
    </svg>
  ),
  github: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.1 11.4.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.5-4-1.5-.6-1.5-1.4-1.9-1.4-1.9-1.2-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.2 2.2 3.2 1.6 4 .1.1-.9.5-1.6.8-1.9-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0C17 6.5 18 6.8 18 6.8c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.6-5.3 5.9.5.4.9 1.2.9 2.4v3.6c0 .4.3.7.8.6A12 12 0 0024 12.5C24 5.9 18.6.5 12 .5z"/>
    </svg>
  ),
  git: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#F34F29" d="M124.58 58.24 69.76 3.42a11.6 11.6 0 0 0-16.37 0l-8.18 8.19 14.36 14.36a9.08 9.08 0 0 1 11.55 11.55l13.9 13.9a9.08 9.08 0 1 1-4.06 4.06L67.11 41.58v28.45a9.08 9.08 0 1 1-5.75-.26V41.15a9.08 9.08 0 0 1-4.54-11.95L42.58 14.84 3.42 53.99a11.6 11.6 0 0 0 0 16.37l54.81 54.81a11.6 11.6 0 0 0 16.37 0l49.98-49.98a11.6 11.6 0 0 0 0-16.37z"/>
    </svg>
  ),
  gitlab: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#FC6D26" d="M64 117.6 98 40H30l34 77.6z"/>
      <path fill="#E24329" d="M64 117.6 30 40H4l60 77.6z"/>
      <path fill="#FC6D26" d="M64 117.6 124 40H98l-34 77.6z"/>
      <path fill="#FCA326" d="M124 40h-26l-34 77.6L124 40zM4 40h26l34 77.6L4 40z"/>
    </svg>
  ),
};

/**
 * Componente Icon unificado.
 * Renderiza un icono basándose en un nombre.
 * Prioridad:
 * 1. Busca en el mapa de `customIcons`.
 * 2. Si no lo encuentra, busca en `lucide-react`.
 * 3. Si tampoco lo encuentra, muestra un icono por defecto (`FileCode`).
 * @param {object} props - Propiedades del componente.
 * @param {string | undefined} props.name - Nombre del icono a renderizar.
 * @returns {JSX.Element} El componente del icono.
 */
export const Icon = ({ name, ...props }: { name?: string } & LucideProps) => {
    // Si no se proporciona un nombre, no renderiza nada.
    if (!name) {
      return null;
    }
  
    // Intenta encontrar un icono en el mapa de SVG personalizados.
    const CustomIcon = customIcons[name.toLowerCase()];
    if (CustomIcon) {
      return <CustomIcon {...props} />;
    }
  
    // Si no es un icono personalizado, busca en la librería Lucide.
    const LucideIcon = LucideIcons[name as IconName];
    if (LucideIcon) {
      return <LucideIcon {...props} />;
    }
  
    // Si no se encuentra en ninguna parte, muestra un icono genérico por defecto.
    return <LucideIcons.FileCode {...props} />;
  };