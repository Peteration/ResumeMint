// src/app/resume/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { Resume } from "@/types/resume";
import Classic from "@/components/resume-templates/Classic";
import Elegant from "@/components/resume-templates/Elegant";
import Modern from "@/components/resume-templates/Modern";
import { Download } from "lucide-react";

export default async function ResumePage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch resume server-side
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Resume fetch error:", error);
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Resume not found.</p>
      </div>
    );
  }

  const resume: Resume = data;

  // Template resolution
  const template = (resume.template || "modern").toLowerCase();

  let TemplateComponent;
  switch (template) {
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

  // PDF Download (client-side handler)
  // We no longer call /api/pdf since it was removed.
  const downloadPDF = () => {
    window.location.href = `/resume/${id}/pdf`;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {resume.fullName}'s Resume
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
