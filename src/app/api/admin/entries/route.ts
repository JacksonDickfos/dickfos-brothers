import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Mock mode check
    if (process.env.MOCK_MODE === "true" || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json([]);
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json([]);
    }
    
    const { data, error } = await supabase
      .from("competition_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch entries" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

