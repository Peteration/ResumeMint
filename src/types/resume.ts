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

  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;

  website?: string;
  linkedin?: string;
  github?: string;

  summary?: string;
  sections: ResumeSection[];

  template: "classic" | "modern" | "elegant";

  created_at?: string;
  updated_at?: string;
}
