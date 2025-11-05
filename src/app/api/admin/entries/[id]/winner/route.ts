import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { is_winner } = await request.json();
    const { id } = await params;

    if (process.env.MOCK_MODE === "true" || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ success: true });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ success: true });
    }
    
    const { error } = await supabase
      .from("competition_entries")
      .update({ is_winner: is_winner })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update entry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

