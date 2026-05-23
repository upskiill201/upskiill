export interface CurriculumLesson {
  id?: string;
  index?: number;
  title: string;
  duration?: string;
  // include other properties as needed
  // [key: string]: any;
}

export interface CurriculumModule {
  title: string;
  lessons: CurriculumLesson[];
  // [key: string]: any;
}

export interface CourseInstructor {
  fullName?: string;
  avatarUrl?: string;
  // [key: string]: any;
}

export interface Course {
  id: string;
  title: string;
  slug?: string;
  shortDescription?: string;
  instructor?: CourseInstructor;
  curriculum: CurriculumModule[];
  // Include index signature for any other properties to avoid breaking anything
  // [key: string]: any;
}
