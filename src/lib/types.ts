/**
 * Interfaz para los perfiles sociales.
 */
export interface Profile {
  network: string; // Nombre de la red social (ej. "LinkedIn").
  username: string; // Nombre de usuario en la red.
  url: string; // URL del perfil.
}

/**
 * Interfaz para la ubicación.
 */
export interface Location {
  address: string; // Dirección.
  postalCode: string; // Código postal.
  city: string; // Ciudad.
  countryCode: string; // Código del país (ej. "CL").
  region: string; // Región o estado.
}

/**
 * Interfaz para los títulos de las secciones.
 */
export interface Headings {
  about: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  summary: string;
  responsibilities: string;
  achievements: string;
  showMore: string;
  showLess: string;
}

/**
 * Interfaz para la información básica del perfil.
 */
export interface Basics {
  name: string; // Nombre completo.
  label: string; // Título o profesión (ej. "Back-End Developer").
  image: string; // URL de la imagen de perfil.
  email: string; // Correo electrónico.
  phone: string; // Número de teléfono.
  url: string; // URL del sitio web personal o portafolio.
  summary: string; // Resumen profesional.
  location: Location; // Objeto con la información de ubicación.
  profiles: Profile[]; // Array de perfiles sociales.
  headings?: Headings; // Títulos de las secciones.
}

/**
 * Interfaz para la experiencia laboral.
 */
export interface Work {
  name: string; // Nombre de la empresa.
  position: string; // Cargo ocupado.
  location_type: string; // Tipo de ubicación (ej. "Remote").
  location: string; // Ubicación de la empresa.
  url:string; // URL de la empresa
  startDate: string; // Fecha de inicio (formato YYYY-MM-DD).
  endDate: string | null; // Fecha de fin o null si es el trabajo actual.
  summary: string; // Resumen del rol.
  highlights: string[]; // Puntos destacados (puede no usarse).
  responsibilities: string[]; // Lista de responsabilidades.
  achievements: string[]; // Lista de logros.
  skills: string[]; // Habilidades utilizadas en el puesto.
}

/**
 * Interfaz para la educación.
 */
export interface Education {
  institution: string; // Nombre de la institución educativa.
  url: string; // URL de la institución.
  area: string; // Área de estudio.
  studyType: string; // Tipo de estudio (ej. "Technical Degree").
  startDate: string; // Año de inicio.
  endDate: string; // Año de finalización.
}

/**
 * Interfaz para las habilidades.
 */
export interface Skill {
  name: string; // Nombre de la habilidad (ej. "TypeScript").
  level: string; // Nivel de dominio (ej. "Intermediate").
  keywords?: string[]; // Palabras clave relacionadas (opcional).
  icon?: string; // Nombre del ícono de Lucide (opcional).
}

/**
 * Interfaz para los idiomas.
 */
export interface Language {
  language: string; // Nombre del idioma.
  fluency: string; // Nivel de fluidez.
}

/**
 * Interfaz para los intereses.
 */
export interface Interest {
  name: string; // Nombre del interés.
  keywords: string[]; // Palabras clave relacionadas.
}

/**
 * Interfaz para las referencias.
 */
export interface Reference {
  name: string; // Nombre de quien da la referencia.
  reference: string; // Contenido de la referencia.
}

/**
 * Interfaz para los proyectos.
 */
export interface Project {
  name: string; // Nombre del proyecto.
  isActive: boolean; // Si el proyecto debe mostrarse o no.
  description: string; // Descripción del proyecto.
  highlights: string[]; // Puntos destacados del proyecto.
  url: string; // URL del proyecto.
  github?: string; // URL del repositorio de GitHub (opcional).
}

/**
 * Interfaz principal que agrupa toda la información del CV.
 */
export interface CVData {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}
