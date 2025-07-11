"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCV } from "./cv-container";
import { Button } from "./ui/button";
import {
  Home,
  Briefcase,
  GraduationCap,
  Lightbulb,
  FolderGit2,
  Printer,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name }: { name: string }) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const iconName = capitalized as IconName;
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <Home className="h-4 w-4" />;
    return <IconComponent className="h-4 w-4" />;
};


export function CommandPalette({className}: {className?: string}) {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const { data, setLang } = useCV();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const socialCommands = data.basics.profiles.map((social) => ({
    name: `Visit ${social.network}`,
    icon: <DynamicIcon name={social.network} />,
    action: () => window.open(social.url, "_blank"),
  }));

  const navigationCommands = [
    { name: "About", href: "#about", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="mr-2 h-4 w-4" /> },
    { name: "Education", href: "#education", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
    { name: "Skills", href: "#skills", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
    { name: "Projects", href: "#projects", icon: <FolderGit2 className="mr-2 h-4 w-4" /> },
  ];

  return (
    <>
      <Button
        variant="outline"
        className={cn("fixed bottom-4 right-4 z-50 shadow-lg", className)}
        onClick={() => setOpen(true)}
      >
        <span className="font-sans text-xs">⌘K</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navigationCommands.map((nav) => (
                <CommandItem key={nav.href} onSelect={() => runCommand(() => (window.location.href = nav.href))}>
                    {nav.icon}
                    <span>{nav.name}</span>
                </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => window.print())}>
              <Printer className="mr-2 h-4 w-4" />
              <span>Print CV</span>
            </CommandItem>
            {socialCommands.map((cmd) => (
                <CommandItem key={cmd.name} onSelect={() => runCommand(cmd.action)}>
                    {cmd.icon}
                    <span>{cmd.name}</span>
                </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
           <CommandSeparator />
          <CommandGroup heading="Language">
            <CommandItem onSelect={() => runCommand(() => setLang("en"))}>
              <span className="mr-2">EN</span>
              <span>English</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setLang("es"))}>
              <span className="mr-2">ES</span>
              <span>Español</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
