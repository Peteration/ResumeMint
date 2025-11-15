// src/components/resume-templates/Classic.tsx
"use client";

import { Resume } from "@/types/resume";

interface ClassicProps {
  data: Resume;
}

export default function Classic({ data }: ClassicProps) {
  return (
    <div className="w-full flex flex-col gap-6 font-serif text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="border-b pb-3 mb-3">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-gray-700 dark:text-gray-300">{data.title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.email} | {data.phone} | {data.location}
        </p>
      </div>

      {/* Summary */}
      {data.summary && (
        <div>
          <h2 className="text-xl font-semibold border-b mb-2">Profile</h2>
          <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
          <div className="flex flex-col gap-3">
            {data.experience.map((job, idx) => (
              <div key={idx}>
                <p className="font-medium">{job.position} - {job.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.startDate} - {job.endDate || "Present"}
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
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
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          {data.education.map((edu, idx) => (
            <p key={idx} className="text-gray-700 dark:text-gray-300">
              {edu.degree}, {edu.institution} ({edu.startDate} - {edu.endDate || "Present"})
            </p>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {data.skills.join(", ")}
          </p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b mb-2">Certifications</h2>
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
