"use client";

// Importaciones del hook del CV y el componente de botón.
import { useCV } from "./cv-container";
import { Button } from "./ui/button";

/**
 * Componente que renderiza un interruptor para cambiar entre inglés y español.
 * @returns {JSX.Element} El elemento JSX del interruptor de idioma.
 */
export function LanguageToggle() {
  // Obtiene el idioma actual (lang) y la función para cambiarlo (setLang) del contexto.
  const { lang, setLang } = useCV();

  return (
    // Contenedor del interruptor con estilos para que parezca un grupo de botones.
    <div className="flex items-center rounded-md border bg-card p-1">
      {/* Botón para seleccionar inglés. */}
      <Button
        // El variant es 'secondary' si el idioma actual es 'en', de lo contrario 'ghost'.
        variant={lang === "en" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setLang("en")}
        className="rounded-sm"
      >
        EN
      </Button>
      {/* Botón para seleccionar español. */}
      <Button
        // El variant es 'secondary' si el idioma actual es 'es', de lo contrario 'ghost'.
        variant={lang === "es" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setLang("es")}
        className="rounded-sm"
      >
        ES
      </Button>
    </div>
  );
}
