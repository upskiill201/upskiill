/**
 * Shape of the course-setup form and its option lists.
 *
 * Split out of page.tsx so the constants can be referenced (and changed)
 * without opening a 1,500-line component, and so the draft shape has one
 * definition shared by the page and its persistence hook.
 */

export type CourseDraft = {
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  level: string;
  language: string;
  shortDescription: string;
  description: string;
  outcomes: string[];
  skills: string[];
  requirements: string[];
  thumbnailUrl: string;
  creatorTimeWeekly?: string;
  price: number;
};

export const EMPTY_DRAFT: CourseDraft = {
  title: '',
  subtitle: '',
  category: '',
  subcategory: '',
  level: 'Beginner',
  language: 'English',
  shortDescription: '',
  description: '',
  outcomes: ['', '', ''],
  skills: [],
  requirements: [''],
  thumbnailUrl: '',
  price: 0,
};

export const CATEGORIES = [
  "Development", "Business", "Finance & Accounting", "IT & Software",
  "Design", "Marketing", "Health & Fitness", "Music", "Teaching & Academics",
  "Photography & Video", "Lifestyle", "I don't know yet"
];

export const SUBCATEGORIES: Record<string, string[]> = {
  "Development": ["Web Development", "Mobile Apps", "Data Science", "Game Dev", "Software Engineering"],
  "Design": ["UI/UX Design", "Graphic Design", "Motion Graphics", "3D & Animation"],
  "Marketing": ["Digital Marketing", "SEO", "Social Media", "Content Marketing"],
  "default": ["General", "Beginner", "Advanced", "Specialization"],
};

export const LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const LANGUAGES = ["English", "French", "Spanish", "German", "Portuguese"];
