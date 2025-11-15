import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Utility function to fetch updated user session including premium
export const getUserPremiumStatus = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("premium")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data?.premium || false;
};
