import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { jobTitle, experience, skills } = await req.json();

    const prompt = `
      You are an expert resume writer.
      Write a clean, ATS-friendly, professional resume section.
      Job Title: ${jobTitle}
      Experience: ${experience}
      Skills: ${skills}
      Format clearly with bullet points.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "system", content: prompt }],
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("AI GENERATE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to generate resume" }, { status: 500 });
  }
}
