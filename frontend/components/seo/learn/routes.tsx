import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { learnTrack, resolveTrackSlug, trackSlugParams } from '@/lib/seo/learn';
import type { LearnTrack } from '@/lib/seo/learn';
import { TopicPage, TrackHub, subjectMetadata } from './SubjectPages';
import { PlacePage, placeMetadata } from './PlacePage';

/**
 * /learn-coding and /learn-ai are the same two routes for different tracks, so
 * the route files only call these. The second segment is a topic or a place —
 * lib/seo/learn.ts guarantees the two never share a slug.
 */

interface SlugProps {
  params: Promise<{ slug: string }>;
}

export function trackHubRoute(track: LearnTrack) {
  const sub = learnTrack(track);
  return {
    metadata: subjectMetadata(sub),
    Page: function LearnTrackHub() {
      return <TrackHub track={sub} />;
    },
  };
}

export function trackSlugRoute(track: LearnTrack) {
  return {
    generateStaticParams: () => trackSlugParams(track),

    generateMetadata: async ({ params }: SlugProps): Promise<Metadata> => {
      const hit = resolveTrackSlug(track, (await params).slug);
      if (!hit) return {};
      return hit.kind === 'topic' ? subjectMetadata(hit.topic) : placeMetadata(hit.track, hit.place);
    },

    Page: async function LearnTrackSlug({ params }: SlugProps) {
      const hit = resolveTrackSlug(track, (await params).slug);
      if (!hit) notFound();
      return hit.kind === 'topic' ? <TopicPage topic={hit.topic} /> : <PlacePage sub={hit.track} place={hit.place} />;
    },
  };
}
