import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  inquiryType: z.enum(["sponsorship", "collaboration", "media"]),
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
    const data = contactSchema.parse(body);

    // Mock mode check
    if (process.env.MOCK_MODE === "true") {
      return NextResponse.json({ success: true, message: "Message sent (mock mode)" });
    }

    // Real Resend integration
    const resend = getResend();
    if (resend && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "contact@dickfos-brothers.com",
        to: process.env.CONTACT_EMAIL || "hello@resemblance.studio",
        subject: `[${data.inquiryType}] Contact Form Submission`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Type:</strong> ${data.inquiryType}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

