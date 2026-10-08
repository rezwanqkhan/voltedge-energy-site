import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
}

export async function POST(request: Request): Promise<NextResponse<ContactApiResponse>> {
  try {
    const body = await request.json();

    // Check honeypot field - bots fill hidden inputs
    if (body.website && String(body.website).trim().length > 0) {
      // Return silent success to discard bot submission
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your inquiry. A systems architect will respond shortly.",
        },
        { status: 200 }
      );
    }

    // Server-side Zod validation
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Form validation failed. Please check the marked fields.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, phone, product, message } = result.data;

    // Production email integration point:
    // e.g. using Resend (resend.emails.send) or Nodemailer with process.env.RESEND_API_KEY
    // In this deployment, we safely log payload and return typed success.
    console.log("[VoltEdge Contact Submission]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || "N/A",
      phone: phone || "N/A",
      product: product || "General Consultation",
      messageLength: message.length,
    });

    // Simulate minor asynchronous processing
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out to VoltEdge Engineering. A qualified IoT systems architect has received your inquiry and will respond within 4 business hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[VoltEdge Contact API Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal transmission error occurred. Please retry or call our desk directly.",
      },
      { status: 500 }
    );
  }
}
