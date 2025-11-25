// src/lib/ai.ts
import OpenAI from "openai";

/**
 * Centralized OpenAI client for ResumeMint.
 * This file fixes all `@/lib/ai` import errors.
 * Works in: server actions, API routes, edge, and RSC.
 */

if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ Missing OPENAI_API_KEY in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper to generate text safely.
 * Optional utility function (you can delete it if not needed).
 */
export async function generateText(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices
