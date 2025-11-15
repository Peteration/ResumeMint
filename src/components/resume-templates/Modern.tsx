// src/components/resume-templates/Modern.tsx
"use client";

import { Resume } from "@/types/resume";

interface ModernProps {
  data: Resume;
}

export default function Modern({ data }: ModernProps) {
  return (
    <div className="w-full flex flex-col gap-6 text-gray-800 dark:text-gray-100">
      {/* Header: Name & Title */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-indigo-600 font-medium">{data.title}</p>
        </div>
        <div className="mt-3 md:mt-0 text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
      </div>

      {/* Summary / Objective */}
      {data.summary && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((job, idx) => (
              <div key={idx} className="flex flex-col">
                <p className="font-medium">{job.position} - {job.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.startDate} - {job.endDate || "Present"}</p>
                <ul className="list-disc list-inside mt-1 text-gray-700 dark:text-gray-300">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-medium">{edu.degree} - {edu.institution}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{edu.startDate} - {edu.endDate || "Present"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-sm px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {data.certifications.map((cert, idx) => (
              <li key={idx}>{cert}</li>
            ))}
          </ul>
      </div>
      )}

    </div>
  );
}
