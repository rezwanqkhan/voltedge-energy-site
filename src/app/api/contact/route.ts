import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side Zod validation
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // In production, you would send an email (e.g., Resend, Nodemailer)
    // or store in a database (e.g., Supabase, Prisma).
    // For this demo, we simulate a short processing delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Contact form submission:", result.data);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry. Our team will respond within 4 hours.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
