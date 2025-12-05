export interface ResumeSection {
  id: string;
  title: string;
  items: ResumeItem[];
}

export interface ResumeItem {
  id: string;
  subtitle?: string;
  title?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface Resume {
  id: string;
  user_id?: string;

  // Basic Info
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;

  // Optional Summary
  summary?: string;

  // Sections such as experience, education, etc.
  sections: ResumeSection[];

  // Template Selection
  template: "classic" | "modern" | "elegant";

  // Timestamp
  created_at?: string;
  updated_at?: string;
}
