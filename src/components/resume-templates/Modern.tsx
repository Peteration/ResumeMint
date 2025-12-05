// src/components/resume-templates/Modern.tsx
import React from "react";
import type { ResumeType } from "@/types/resume";

interface ModernProps {
  resume: ResumeType;
}

export default function Modern({ resume }: ModernProps) {
  return (
    <div className="p-6 font-sans text-gray-800 bg-gray-50 rounded shadow">
      <header className="border-b pb-2 mb-4">
        <h1 className="text-3xl font-bold">{resume.fullName}</h1>
        <h2 className="text-xl text-gray-600">{resume.role}</h2>
        <p>{resume.email} | {resume.phone} | {resume.location}</p>
      </header>

      <section className="mb-4">
        <h3 className="font-semibold">Professional Summary</h3>
        <p>{resume.summary}</p>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-1">
          {resume.skills.map((skill) => (
            <li key={skill} className="px-2 py-1 bg-blue-200 rounded text-sm">{skill}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold">Experience</h3>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mt-2">
            <h4 className="font-semibold">{exp.title} @ {exp.company}</h4>
            <p className="text-sm text-gray-500">{exp.start} - {exp.end}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="font-semibold">Education</h3>
        {resume.education.map((edu, i) => (
          <div key={i} className="mt-2">
            <h4 className="font-semibold">{edu.degree} @ {edu.school}</h4>
            <p className="text-sm text-gray-500">{edu.start} - {edu.end}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
