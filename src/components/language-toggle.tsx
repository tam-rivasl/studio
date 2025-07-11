"use client";

import { useCV } from "./cv-container";
import { Button } from "./ui/button";

export function LanguageToggle() {
  const { lang, setLang } = useCV();

  return (
    <div className="flex items-center rounded-md border bg-white p-1">
      <Button
        variant={lang === "en" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setLang("en")}
        className="rounded-sm"
      >
        EN
      </Button>
      <Button
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
