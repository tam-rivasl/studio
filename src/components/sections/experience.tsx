"use client";

import { useCV } from "../cv-container";

export function ExperienceSection() {
  const { data } = useCV();
  const { work } = data;

  const formatDate = (date: string | null) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
  }


  return (
    <section id="experience" className="scroll-mt-20">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>
      <div className="space-y-8">
        {work.map((job, index) => (
          <div key={index} className="relative pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-primary border-2 border-white"></div>
            
            <p className="text-sm text-muted-foreground mb-1">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
            <h3 className="text-xl font-semibold">{job.position} @ <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{job.name}</a></h3>
            <p className="text-md text-muted-foreground mb-3">{job.location}, {job.location_type}</p>
            
            {job.summary && (
                <>
                    <h4 className="font-semibold text-md mb-1">Summary:</h4>
                    <p className="text-base text-muted-foreground mb-4">{job.summary}</p>
                </>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                    <h4 className="font-semibold text-md mb-1">Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground mb-4">
                        {job.responsibilities.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </>
            )}

             {job.achievements && job.achievements.length > 0 && (
                <>
                    <h4 className="font-semibold text-md mb-1">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                        {job.achievements.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
