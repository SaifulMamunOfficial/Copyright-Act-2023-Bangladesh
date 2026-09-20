export type VerificationStatus = 'needs_review' | 'verified' | 'published' | 'outdated' | string;

export interface GranularVerification {
  law_text: VerificationStatus;
  explanation: VerificationStatus;
  examples: VerificationStatus;
  verified_by: string | null;
  verified_at: string | null;
}

export interface LegalSource {
  source_url: string;
  law_version: string;
  effective_date: string;
  verified_at: string;
}

export interface Section {
  id: string; // e.g., COPY-001
  section_number: string;
  title: string;
  original_law_text: string;
  explanation: string;
  examples: any[];
  faqs: any[];
  topics: any[];
  related_sections: string[];
  source: LegalSource;
  verification?: GranularVerification;
}

export interface Chapter {
  id: string; // e.g., CHAP-01
  chapter_number: string;
  title: string;
  sections: Section[];
}

export interface LawData {
  title: string;
  act_number: string;
  year: number;
  chapters: Chapter[];
}
