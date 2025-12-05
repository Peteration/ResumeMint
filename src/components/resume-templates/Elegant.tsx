// src/components/resume-templates/Elegant.tsx
import React from "react";
import type { ResumeType } from "@/types/resume";

interface ElegantProps {
  resume: ResumeType;
}

export default function Elegant({ resume }: ElegantProps) {
  return (
    <div className="p-6 font-serif text-gray-900">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">{resume.fullName}</h1>
        <h2 className="text-2xl text-gray-700">{resume.role}</h2>
      </header>

      <section className="mb-6">
        <h3 className="font-semibold">Summary</h3>
        <p className="italic">{resume.summary}</p>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {resume.skills.map((skill) => (
            <span key={skill} className="px-2 py-1 bg-gray-200 rounded text-sm">{skill}</span>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Experience</h3>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mt-2">
            <h4 className="font-semibold">{exp.title} @ {exp.company}</h4>
            <p className="text-sm text-gray-600">{exp.start} - {exp.end}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="font-semibold">Education</h3>
        {resume.education.map((edu, i) => (
          <div key={i} className="mt-2">
            <h4 className="font-semibold">{edu.degree} @ {edu.school}</h4>
            <p className="text-sm text-gray-600">{edu.start} - {edu.end}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
