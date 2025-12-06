// src/app/resume/[id]/pdf/route.ts
import { NextResponse } from "next/server";
import { generateResumePDF } from "@/lib/pdf";
import { getResumeById } from "@/lib/supabase/server"; // server-only
import type { Resume } from "@/types/resume";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const resumeId = params.id;

  // Fetch resume data from Supabase
  const resume: Resume = await getResumeById(resumeId);

  const stream = generateResumePDF(resume);
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  return new Response(buffer, {
    status: 200,
    headers: { "Content-Type": "application/pdf" },
  });
}
