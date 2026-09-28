/** GET /profile/creator/:identifier (backend ProfileService.getPublicCreatorProfile). */

import type { CreatorTrack } from '@/lib/creator/categories';

export interface CreatorCourse {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  level: string;
  lessonsCount: number;
  studentsCount: number;
  /** Real review average; null when the course has no reviews yet. */
  rating: number | null;
  category: string;
  thumbnailUrl?: string | null;
}

export interface CreatorSocials {
  website: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  youtube: string | null;
  instagram: string | null;
  tiktok: string | null;
}

export interface CreatorPublicProfile {
  id: string;
  fullName: string;
  username: string;
  avatarUrl: string | null;
  creatorStatus: string;
  headline: string;
  bio: string;
  about: string;
  location: string | null;
  languages: string[];
  followersCount: number;
  followingCount: number;
  coursesCount: number;
  learnersCount: number;
  rating: number | null;
  isFollowing: boolean;
  featuredCourse: CreatorCourse | null;
  courses: CreatorCourse[];
  track?: CreatorTrack | null;
  topics?: string[];
  socials?: CreatorSocials | null;
  isSelf?: boolean;
}

export function allCourses(p: Pick<CreatorPublicProfile, 'featuredCourse' | 'courses'>): CreatorCourse[] {
  return [...(p.featuredCourse ? [p.featuredCourse] : []), ...p.courses];
}
