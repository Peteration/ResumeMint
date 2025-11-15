// src/lib/openai.ts
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
