/** Represents a product category for filtering */
export type ProductCategory = "all" | "hardware" | "gateway" | "software";

/** Technical specification for a product */
export interface ProductSpec {
  label: string;
  value: string;
}

/** An IoT energy management product */
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Exclude<ProductCategory, "all">;
  icon: string; // Lucide icon name
  image: string; // Product render/photo
  specs: ProductSpec[];
  highlights?: string[];
  badge?: string; // e.g. "Best Seller", "New"
}

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
  avatar: string; // path to image
}

/** Contact form data payload */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}
