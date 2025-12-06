// src/app/resume/[id]/pdf/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { generateResumePDF } from "@/lib/pdf";

export async function GET(_, { params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const pdfStream = generateResumePDF(data);

  const chunks = [];
  for await (const chunk of pdfStream) {
    chunks.push(chunk);
  }

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${id}.pdf"`,
    },
  });
}
