// src/lib/ai.ts
import OpenAI from "openai";

/**
 * Centralized OpenAI client for ResumeMint
 * Fixes all "@/lib/ai" import errors.
 */

if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ Missing OPENAI_API_KEY in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Generic helper to generate text
 */
export async function generateText(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    return "";
  }
}

/**
 * Reusable generator for specific resume sections
 */
export async function generateResumeSection(type: string, data: any) {
  const prompt = `
Create a professional ${type} section for a resume using this data:

${JSON.stringify(data, null, 2)}

Ensure it is clean, concise, ATS-friendly, and well formatted.
  `;

  return generateText(prompt);
}

/**
 * 🔥 MAIN EXPORT USED IN UI (Fixes the missing import error)
 * This is what your editor & builder expect.
 */
export async function generateResumeAI(data: any) {
  const prompt = `
Create a clean, professional, ATS-optimized resume output based on the following data:

${JSON.stringify(data, null, 2)}

Return only high-quality resume content.
  `;

  return generateText(prompt);
}
