"use client";

// Importaciones del hook del CV y el componente Badge de la UI.
import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// Un tipo para asegurar que solo pasamos nombres de íconos válidos de Lucide.
type IconName = keyof typeof LucideIcons;

// Map de logos SVG para tecnologías específicas.
const svgLogos: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
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
  nodejs: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#339933" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M58.91 43.14a2.91 2.91 0 00-1.28.3L37.1 54.38a2.91 2.91 0 00-1.46 2.53v24.18a2.91 2.91 0 001.46 2.53l20.54 10.94a2.91 2.91 0 002.91 0l20.54-10.94a2.91 2.91 0 001.46-2.53V56.91a2.91 2.91 0 00-1.46-2.53L60.2 43.44a2.91 2.91 0 00-1.29-.3zM46.7 58.74c0-.85.69-1.54 1.54-1.54h31.51c.85 0 1.54.69 1.54 1.54v9.91c0 .85-.69 1.54-1.54 1.54h-7.69v5.94c0 .85-.69 1.54-1.54 1.54H55.93c-.85 0-1.54-.69-1.54-1.54v-5.94h-6.15c-.85 0-1.54-.69-1.54-1.54v-9.91z" />
    </svg>
  ),
  java: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#F89820" d="M0 0h128v128H0z" />
      <path fill="#5382A1" d="M85.3 49.6c-2-1-4.2-1.3-6.3-1.3-5.2 0-9.2 3.2-9.2 8.7 0 4.2 2.6 7.4 6.8 8.1l11.2 2.1c8.4 1.4 13.5 5.5 13.5 12.8 0 7.9-6.3 12.9-15.6 12.9-5.1 0-9.9-1.9-13.4-4.5l3.5-7.7c2.8 1.9 6.2 3.1 9.7 3.1 4.9 0 8.3-2.3 8.3-6.6 0-3.9-3-6.3-8.8-7.3l-10.7-1.8c-7.2-1.2-11.8-5.1-11.8-11.6 0-7.2 5.7-12 14.1-12 4.4 0 8.4 1.3 11.6 3.1l-3.3 7.3z" />
    </svg>
  ),
  python: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#3776AB" d="M0 0h128v128H0z" />
      <path fill="#FFD43B" d="M64 19.3v21.4h21.4c0-11.8-9.6-21.4-21.4-21.4zM42.6 40.7H21.2C21.2 52.5 30.8 62.1 42.6 62.1V40.7z" />
      <path fill="#3776AB" d="M64 108.7v-21.4H42.6c0 11.8 9.6 21.4 21.4 21.4zM85.4 87.3H106.8c0-11.8-9.6-21.4-21.4-21.4V87.3z" />
      <circle cx="53.3" cy="24.4" r="5.1" fill="#fff" />
      <circle cx="74.7" cy="103.6" r="5.1" fill="#fff" />
    </svg>
  ),
  docker: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#2496ED" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M102.6 57.6c-1-3.6-4-6.3-7.8-6.3H70.3v-9.5c0-2-1.6-3.6-3.6-3.6h-6.7c-2 0-3.6 1.6-3.6 3.6v9.5h-9.5c-2 0-3.6 1.6-3.6 3.6v6.7c0 2 1.6 3.6 3.6 3.6h9.5v9.5c0 2 1.6 3.6 3.6 3.6h6.7c2 0 3.6-1.6 3.6-3.6v-9.5h9.5c2 0 3.6-1.6 3.6-3.6v-6.7c0-1.4-.8-2.6-2-3.2zM33.7 60.1c-1.3-4.6-5.3-8-10.4-8-6.1 0-11 4.9-11 11s4.9 11 11 11c5.1 0 9.2-3.4 10.4-8h11.7c-1.3 4.6-5.3 8-10.4 8-6.1 0-11 4.9-11 11s4.9 11 11 11h22.1c0-6.1-4.9-11-11-11-5.1 0-9.2 3.4-10.4 8h-11.7c1.3-4.6 5.3-8 10.4-8 6.1 0 11-4.9 11-11s-4.9-11-11-11c-5.1 0-9.2 3.4-10.4 8H33.7z" />
    </svg>
  ),
  react: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#61DAFB" d="M0 0h128v128H0z" />
      <g fill="none" stroke="#000" stroke-width="3">
        <ellipse cx="64" cy="64" rx="55" ry="22" />
        <ellipse cx="64" cy="64" rx="55" ry="22" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="55" ry="22" transform="rotate(120 64 64)" />
      </g>
      <circle cx="64" cy="64" r="8" fill="#000" />
    </svg>
  ),
  "next.js": (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#000" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M64 19.3c-24.8 0-44.9 20.1-44.9 44.9s20.1 44.9 44.9 44.9 44.9-20.1 44.9-44.9-20.1-44.9-44.9-44.9zm0 80.8c-19.8 0-35.9-16.1-35.9-35.9s16.1-35.9 35.9-35.9 35.9 16.1 35.9 35.9-16.1 35.9-35.9 35.9z" />
      <path fill="#fff" d="M64 43.1h-8.9v33.7h8.9v-24.8L81.8 84h10.1V43.1h-8.9v24.8L64 43.1z" />
    </svg>
  ),
  "nest.js": (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#E0234E" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M64 19.3c-24.8 0-44.9 20.1-44.9 44.9s20.1 44.9 44.9 44.9 44.9-20.1 44.9-44.9-20.1-44.9-44.9-44.9zm0 80.8c-19.8 0-35.9-16.1-35.9-35.9s16.1-35.9 35.9-35.9 35.9 16.1 35.9 35.9-16.1 35.9-35.9 35.9z" />
      <path fill="#fff" d="M73.8 48.6L64 58.4l-9.8-9.8-4.9 4.9 14.7 14.7 14.7-14.7-4.9-4.9zM54.2 79.4l9.8-9.8 9.8 9.8 4.9-4.9-14.7-14.7-14.7 14.7 4.9 4.9z" />
    </svg>
  ),
  "spring boot": (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#6DB33F" d="M0 0h128v128H0z" />
      <path fill="#fff" d="M96.7 46c-2.4-1.5-5.2-2.3-8.2-2.3-6.8 0-12 4.2-12 11.4 0 5.5 3.4 9.7 8.9 10.6l14.6 2.7c11 1.8 17.6 7.2 17.6 16.7 0 10.3-8.2 16.8-20.4 16.8-6.7 0-12.9-2.5-17.5-5.9l4.6-10.1c3.6 2.5 8.1 4 12.7 4 6.4 0 10.8-3 10.8-8.6 0-5.1-3.9-8.2-11.5-9.5L81.2 69.8c-9.4-1.6-15.4-6.7-15.4-15.2 0-9.4 7.4-15.7 18.4-15.7 5.7 0 11 1.7 15.2 4.1l-4.3 9.6z" />
    </svg>
  ),
};

const LucideIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = LucideIcons[name as IconName];
  if (!IconComponent) {
    return <LucideIcons.FileCode {...props} />;
  }
  return <IconComponent {...props} />;
};

/**
 * Componente que muestra la sección de habilidades del CV.
 * @returns {JSX.Element | null} El elemento JSX de la sección o null si no hay habilidades.
 */
export function SkillsSection() {
  const { data } = useCV();
  const { skills } = data;

  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6 text-primary">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          const SvgIcon = svgLogos[skill.name.toLowerCase()];
          return (
            <Badge key={index} variant="secondary" className="flex items-center gap-2 text-sm font-medium transition-transform duration-200 hover:scale-105">
              {SvgIcon ? <SvgIcon className="h-4 w-4" /> : skill.icon && <LucideIcon name={skill.icon} className="h-4 w-4" />}
              <span>{skill.name}</span>
            </Badge>
          );
        })}
      </div>
    </section>
  );
}
