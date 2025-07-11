"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { AboutSection } from "./sections/about";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name }: { name: string }) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const iconName = capitalized as IconName;
    const IconComponent = LucideIcons[iconName];

    if (!IconComponent) {
        if (capitalized === 'Github') return <LucideIcons.Github className="h-4 w-4" />;
        return <LucideIcons.Link className="h-4 w-4" />;
    }
    return <IconComponent className="h-4 w-4" />;
};


export function CVSidebar({className}: {className?: string}) {
  const { data } = useCV();
  const { basics } = data;

  return (
    <aside className={cn("space-y-8", className)}>
      <div>
        <Image 
          src={"https://placehold.co/200x200.png"}
          data-ai-hint="avatar"
          alt={basics.name}
          width={150}
          height={150}
          className="rounded-lg shadow-lg mb-4"
        />
        <h1 className="text-3xl font-bold">{basics.name}</h1>
        <p className="text-lg text-gray-600">{basics.label}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{basics.location.city}, {basics.location.region}</span>
        </div>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
             <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${basics.email}`} className="hover:text-black transition-colors">{basics.email}</a>
            </div>
             <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{basics.phone}</span>
            </div>
             <div className="flex justify-start gap-2 pt-2">
                {basics.profiles.map(social => (
                    <a href={social.url} key={social.network} target="_blank" rel="noopener noreferrer" aria-label={social.network}>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black">
                            <DynamicIcon name={social.network}/>
                        </Button>
                    </a>
                ))}
            </div>
        </div>
      </div>
      
      <AboutSection />

      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

    </aside>
  );
}
