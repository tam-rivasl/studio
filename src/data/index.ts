
import enData from './en.json';
import esData from './es.json';
import frData from './fr.json';
import deData from './de.json';
import type { CVData } from '@/lib/types';

export const languages = [
  { name: 'Español', code: 'es' },
  { name: 'English', code: 'en' },
  { name: 'Français', code: 'fr' },
  { name: 'Deutsch', code: 'de' },
] as const;

export type Language = typeof languages[number];
export type LanguageCode = Language['code'];

export const cvData: Record<LanguageCode, CVData> = {
  en: enData as CVData,
  es: esData as CVData,
  fr: frData as CVData,
  de: deData as CVData,
};
