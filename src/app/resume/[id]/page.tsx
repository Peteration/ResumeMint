// src/app/resume/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Resume } from "@/types/resume";
import Classic from "@/components/resume-templates/Classic";
import Elegant from "@/components/resume-templates/Elegant";
import Modern from "@/components/resume-templates/Modern";
import { Loader2, Download } from "lucide-react";

export default function ResumePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchResume = async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching resume:", error);
        setResume(null);
      } else {
        setResume(data);
      }

      setLoading(false);
    };

    fetchResume();
  }, [id]);

  const downloadPDF = () => {
    if (!id) return;
    window.open(`/api/pdf?resumeId=${id}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />
        <p className="ml-2 text-gray-500">Loading resume...</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Resume not found.</p>
      </div>
    );
  }

  let TemplateComponent;

  switch (resume.template.toLowerCase()) {
    case "classic":
      TemplateComponent = Classic;
      break;
    case "elegant":
      TemplateComponent = Elegant;
      break;
    case "modern":
    default:
      TemplateComponent = Modern;
      break;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {resume.title}
        </h1>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <Download className="w-5 h-5" /> Download PDF
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md">
        <TemplateComponent data={resume} />
      </div>
    </div>
  );
}
