"use client";

import * as React from "react";
import { useCV } from "./cv-container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { languages, type Language } from "@/data";
import { FlagIcon } from "./flag-icon";

export function LanguageToggle() {
  const { lang, setLang } = useCV();

  const selectedLanguage = languages.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
           {selectedLanguage && <FlagIcon code={selectedLanguage.code} className="mr-2 h-4 w-4" />}
          {selectedLanguage?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language: Language) => (
          <DropdownMenuItem key={language.code} onClick={() => setLang(language.code)}>
             <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <FlagIcon code={language.code} className="mr-2 h-4 w-4" />
                    <span>{language.name}</span>
                </div>
                {lang === language.code && <Check className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
