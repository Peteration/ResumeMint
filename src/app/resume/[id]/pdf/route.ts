// src/app/resume/[id]/pdf/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { generateResumePDF } from "@/lib/pdf";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resumeId = params.id;

    // Fetch resume from Supabase
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .single();

    if (error || !data) {
      console.error("Resume fetch error:", error);
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    // Generate PDF bytes
    const pdfBytes = await generateResumePDF(data);

    // Return PDF file to browser
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
