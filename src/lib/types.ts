export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  name: string;
  position: string;
  location_type: string;
  location: string;
  url: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  highlights: string[];
  responsibilities: string[];
  achievements: string[];
  skills: string[];
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Interest {
  name: string;
  keywords: string[];
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Project {
  name: string;
  isActive: boolean;
  description: string;
  highlights: string[];
  url: string;
  github?: string;
}

export interface CVData {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}
