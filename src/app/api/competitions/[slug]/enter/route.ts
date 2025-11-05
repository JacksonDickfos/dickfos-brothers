import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const entrySchema = z.object({
  competitionId: z.string().uuid(),
  fullName: z.string().min(1),
  email: z.string().email(),
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  caption: z.string().min(1),
  termsAccepted: z.string().refine((val) => val === "true"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const formData = await request.formData();
    const { slug } = await params;
    
    const data = {
      competitionId: formData.get("competitionId") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      instagramHandle: formData.get("instagramHandle") as string | undefined,
      tiktokHandle: formData.get("tiktokHandle") as string | undefined,
      caption: formData.get("caption") as string,
      termsAccepted: formData.get("termsAccepted") as string,
    };

    const validated = entrySchema.parse(data);
    const mediaFile = formData.get("mediaFile") as File | null;

    // Mock mode check
    if (process.env.MOCK_MODE === "true" || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({
        success: true,
        message: "Entry submitted (mock mode)",
        shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/competitions/${slug}`,
      });
    }

    // Real Supabase integration
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        message: "Entry submitted (mock mode - no Supabase configured)",
        shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/competitions/${slug}`,
      });
    }
    
    // Upload media to Supabase Storage if provided
    let mediaUrl: string | null = null;
    if (mediaFile) {
      const fileExt = mediaFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `competitions/${slug}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("competition-entries")
        .upload(filePath, mediaFile, {
          contentType: mediaFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        // Continue without media URL
      } else {
        const { data: urlData } = supabase.storage
          .from("competition-entries")
          .getPublicUrl(filePath);
        mediaUrl = urlData.publicUrl;
      }
    }

    // Insert entry into database
    const { data: entry, error } = await supabase
      .from("competition_entries")
      .insert({
        competition_id: validated.competitionId,
        full_name: validated.fullName,
        email: validated.email,
        instagram_handle: validated.instagramHandle || null,
        tiktok_handle: validated.tiktokHandle || null,
        caption: validated.caption,
        media_url: mediaUrl,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save entry" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Entry submitted successfully",
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/competitions/${slug}?entry=${entry.id}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit entry" },
      { status: 500 }
    );
  }
}

