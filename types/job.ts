export type ListingCategory =
  | "Internship"
  | "Full-time"
  | "Hackathon"
  | "Research"
  | "Campus Drive";

export type WorkMode = "Remote" | "Onsite" | "Hybrid";

export type ExperienceLevel =
  | "Fresher"
  | "1-2 Years"
  | "3+ Years";

export type Branch =
  | "CSE"
  | "ECE"
  | "Mechanical"
  | "Civil"
  | "Electrical"
  | "All";

export type Year =
  | "1st"
  | "2nd"
  | "3rd"
  | "4th"
  | "All";

export interface Job {
  id: string;

  /* ---------- CORE INFO ---------- */
  title: string;
  company: string;
  location: string;

  category: ListingCategory;   // Internship / Hackathon / etc.
  workMode: WorkMode;          // Remote / Onsite / Hybrid
  experience: ExperienceLevel;

  stipend?: string;            // For internships
  salary?: string;             // For full-time

  duration?: string;

  deadline: string;            // ISO date
  postedAt: string;            // ISO date

  /* ---------- ELIGIBILITY ---------- */
  eligibleBranches: Branch[];
  eligibleYears: Year[];

  isPaid: boolean;

  skillTags: string[];

  /* ---------- VERIFICATION LAYER ---------- */
  isVerified: boolean;
  adminApproved: boolean;

  upvotes: number;
  downvotes: number;

  reportCount: number;

  /* ---------- DETAILS ---------- */
  description: string;
  requirements: string[];
  responsibilities: string[];

  applyLink: string;
}