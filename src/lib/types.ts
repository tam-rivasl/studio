export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  socials: Social[];
  about: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  link: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  sections: {
    about: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}
