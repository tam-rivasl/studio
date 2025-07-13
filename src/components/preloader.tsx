
"use client";

import { Progress } from "./ui/progress";
import { useCV } from "./cv-container";


export function Preloader({ progress }: { progress: number }) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-heading">
          Tamara Rivas
        </h1>
        <p className="text-xl md:text-2xl text-primary font-body mt-2">
          Desarrolladora Back-End
        </p>
      </div>
      <div className="w-full max-w-md mt-8">
        <Progress value={progress} className="h-4 rounded-none" />
      </div>
    </div>
  );
}
