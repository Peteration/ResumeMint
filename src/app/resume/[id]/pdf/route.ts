import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateResumePDF } from "@/lib/pdf";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const pdfBuffer = await generateResumePDF(resume);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="resume-${params.id}.pdf"`,
    },
  });
}
