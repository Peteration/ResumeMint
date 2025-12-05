// src/types/resume.ts

export type Experience = {
  company: string;
  title: string;
  start: string;
  end: string;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export type ResumeType = {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
};
