import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must use service key for insert
);

export async function POST(req: Request) {
  try {
    const { jobTitle, experience, skills, userId, save } = await req.json();

    if (!jobTitle || !experience || !skills)
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );

    const prompt = `
      You are an expert resume writer.
      Write a clean, ATS-friendly, professional resume in JSON format.
      Include: name, title, summary, experience (list), education (list), and skills (list).
      Job Title: ${jobTitle}
      Experience: ${experience}
      Skills: ${skills}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Output a valid JSON resume." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const resumeData = JSON.parse(
      completion.choices[0].message?.content || "{}"
    );

    // Optionally save to Supabase if userId + save flag are passed
    let savedResume = null;
    if (save && userId) {
      const { data, error } = await supabase
        .from("resumes")
        .insert([
          {
            user_id: userId,
            title: resumeData.title || jobTitle || "AI Resume",
            data: resumeData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      savedResume = data;
    }

    return NextResponse.json({
      success: true,
      result: resumeData,
      saved: !!savedResume,
      resume: savedResume,
    });
  } catch (error: any) {
    console.error("AI GENERATE ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate resume" },
      { status: 500 }
    );
  }
}
