import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key for server-side
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("id, name, description, preview_url, category, is_premium");

    if (error) throw error;

    return NextResponse.json({ success: true, templates: data });
  } catch (error: any) {
    console.error("TEMPLATE FETCH ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
