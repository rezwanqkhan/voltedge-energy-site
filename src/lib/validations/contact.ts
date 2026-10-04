import { z } from "zod";

/** Zod validation schema for the contact form */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be under 100 characters." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),

  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .max(100, { message: "Company name must be under 100 characters." })
    .optional()
    .or(z.literal("")),

  facilityType: z
    .enum(["Manufacturing", "Data Center", "Commercial", "Cold Storage", "Other"])
    .optional(),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must be under 1000 characters." }),
});

/** Aliases for convenience */
export const contactSchema = contactFormSchema;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
