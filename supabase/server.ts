// src/lib/supabase/server.ts
"use server"; // optional marker, clarifies this is server-only

import { createClient } from "@supabase/supabase-js";
import type { Resume } from "@/types/resume";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Fetch a single resume by ID
export async function getResumeById(id: string): Promise<Resume> {
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Resume;
}

// Check if a user has premium
export async function getUserPremiumStatus(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("is_premium")
    .eq("id", userId)
    .single();

  if (error) return false;
  return !!data?.is_premium;
}
