export type { ProductCategory, ProductSpec, Product } from "@/lib/products";

/** A key metric / stat displayed on the homepage */
export interface Metric {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description: string;
  icon: string;
}

/** A team member displayed on the about page */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

/** Contact form data payload */
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  product?: string;
  message: string;
}

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}
