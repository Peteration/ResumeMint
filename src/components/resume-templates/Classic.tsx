// src/components/resume-templates/Classic.tsx
import React from "react";
import type { ResumeType } from "@/types/resume";

interface ClassicProps {
  resume: ResumeType;
}

export default function Classic({ resume }: ClassicProps) {
  return (
    <div className="p-6 font-sans text-gray-900">
      <h1 className="text-3xl font-bold">{resume.fullName}</h1>
      <h2 className="text-xl text-gray-700">{resume.role}</h2>
      <p className="mt-2">{resume.summary}</p>

      <section className="mt-4">
        <h3 className="font-semibold">Skills</h3>
        <ul className="flex flex-wrap gap-2 mt-1">
          {resume.skills.map((skill) => (
            <li key={skill} className="px-2 py-1 bg-gray-200 rounded text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="font-semibold">Experience</h3>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mt-2">
            <h4 className="font-semibold">{exp.title} @ {exp.company}</h4>
            <p className="text-sm text-gray-600">{exp.start} - {exp.end}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-4">
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
