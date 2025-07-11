"use client";

import { useCV } from "../cv-container";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ProjectsSection() {
  const { data } = useCV();
  const { projects } = data;

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.filter(p=>p.isActive).map((project, index) => (
          <Card key={index} className="flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
              {project.description && <CardDescription className="text-gray-600">{project.description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-grow">
               {project.highlights && project.highlights.length > 0 && (
                 <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {project.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                 </ul>
               )}
            </CardContent>
            <CardFooter>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full bg-gray-50 hover:bg-gray-100">
                    View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
