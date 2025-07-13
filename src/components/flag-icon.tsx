
import { cn } from "@/lib/utils";
import type { LanguageCode } from "@/data";

const flagClasses: Record<LanguageCode, string> = {
  es: "fi fi-es",
  en: "fi fi-gb",
  fr: "fi fi-fr",
  de: "fi fi-de",
};

export function FlagIcon({ code, className }: { code: LanguageCode, className?: string }) {
  // Para evitar problemas con PurgeCSS en producción,
  // incluimos las clases completas en el código.
  const flagClass = flagClasses[code] || "fi fi-xx"; // 'xx' para un país desconocido como fallback
  return <span className={cn(flagClass, "fis", className)} />;
}
