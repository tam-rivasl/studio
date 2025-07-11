"use client";

import { Home, Briefcase, GraduationCap, Lightbulb, FolderGit2, Mail, MapPin } from "lucide-react";
import { useCV } from "./cv-container";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { Button } from "./ui/button";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name }: { name: string }) => {
    const iconName = name.charAt(0).toUpperCase() + name.slice(1) as IconName;
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <Home className="h-4 w-4" />;
    return <IconComponent className="h-4 w-4" />;
};

export function CVSidebar({className}: {className?: string}) {
  const { data } = useCV();
  const { personalInfo } = data;

  const navItems = [
    { name: "About", href: "#about", icon: Home },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Education", href: "#education", icon: GraduationCap },
    { name: "Skills", href: "#skills", icon: Lightbulb },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
  ];

  return (
    <aside className={cn("w-full flex-col border-r bg-card p-6 text-card-foreground lg:w-80 lg:min-h-screen", className)}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-headline text-primary">{personalInfo.name}</h1>
        <p className="mt-1 text-lg text-muted-foreground font-body">{personalInfo.title}</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{personalInfo.location}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">{personalInfo.email}</a>
        </div>
      </div>

      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href}>
                <Button variant="ghost" className="w-full justify-start gap-3 text-base font-body">
                  <item.icon className="h-5 w-5 text-accent" />
                  {item.name}
                </Button>
              </a>
            </li>
          ))}
        </ul>
      </nav>

        <div className="mt-10 border-t pt-6">
             <div className="flex justify-center gap-2">
                {personalInfo.socials.map(social => (
                    <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                            <DynamicIcon name={social.icon}/>
                        </Button>
                    </a>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </div>
    </aside>
  );
}
