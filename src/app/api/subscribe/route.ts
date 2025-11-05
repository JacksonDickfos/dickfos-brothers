import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const getResend = () => {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY);
  }
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    // Mock mode check
    if (process.env.MOCK_MODE === "true") {
      return NextResponse.json({ success: true, message: "Subscribed (mock mode)" });
    }

    // Real Resend integration
    const resend = getResend();
    if (resend) {
      await resend.contacts.create({
        email,
        // Add to your audience/list ID
      });
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

