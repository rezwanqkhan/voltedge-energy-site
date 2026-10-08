import { z } from "zod";

/**
 * Zod validation schema for the contact form.
 * Shared between client-side validation and server-side Route Handler.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must be under 100 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address." }),

  company: z
    .string()
    .trim()
    .max(100, { message: "Company name must be under 100 characters." })
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone number is too long." })
    .optional()
    .or(z.literal("")),

  product: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, { message: "Inquiry message must be at least 10 characters." })
    .max(1500, { message: "Inquiry message must be under 1500 characters." }),

  // Honeypot field for bot protection (must remain empty)
  website: z.string().max(0, { message: "Bot submission detected." }).optional().or(z.literal("")),
});

export const contactSchema = contactFormSchema;
export type ContactFormData = z.infer<typeof contactFormSchema>;
