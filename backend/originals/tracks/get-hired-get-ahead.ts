import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './get-hired-get-ahead/how-to-get-hired/u01';
import u02 from './get-hired-get-ahead/how-to-get-hired/u02';

/**
 * Get Hired, Get Ahead (Career). Outline: docs/originals/get-hired-get-ahead-outline.md
 * (approved 2026-10-20). Two levels; Level 1 "How to Get Hired" (storyline
 * "Clinton Gets Hired", 10 chapters) is written first. Level 2 "How to Get
 * Ahead at Work" ("Clinton's First Year", 5 chapters) follows. Replaces the
 * old Acing Job Interviews plan (now Level 1, Chapter 8).
 *
 * Clinton (21, final-year Computer Science, University of Buea) goes from
 * "I don't have any experience" at the careers fair to an offer from Njangi
 * Pay, a fictional Douala fintech. Miracle (team lead at Afiya, Lagos) coaches
 * him from the hiring side. Learners build their own career kit as they go.
 * "Find my level" placement is on (PLACEMENT_TRACKS).
 */
const track: OriginalTrackDef = {
  slug: 'get-hired-get-ahead',
  title: 'Get Hired, Get Ahead',
  category: 'Career',
  description: 'Land your first job and grow in it: skills, portfolio, CV, cover letter, LinkedIn, networking, interviews, offers, and your first years at work.',
  levels: [
    {
      level: 1,
      slug: 'how-to-get-hired',
      title: 'How to Get Hired',
      subtitle: 'Clinton Gets Hired: from "I have no experience" to "You\'re hired"',
      shortDescription:
        'Find the skills you already have, then build a CV, cover letter and LinkedIn profile that get read, find the jobs nobody advertises, ace the interview and negotiate the offer.',
      description:
        "\"So what can you do?\" At the careers fair, Clinton says, \"Well, I don't have any experience yet...\" and watches the recruiter's eyes glaze over. He has eight months until graduation. Follow Clinton, a final-year Computer Science student in Buea, Cameroon, as he discovers the skills he already has, builds proof without a job, writes a CV and cover letter that get read, finds the roles nobody posts, survives his first rejection and negotiates his first offer. His mentor, Miracle, hires people for a living, so you see every step from the other side of the desk too. As you go, you build your own career kit, in your own words: by the end you have everything you need to apply, with advice that works wherever you live. Ten-minute lessons, made for your phone.",
      startingPoint: 'Students, graduates, and anyone looking for their first job or their next one. No experience needed, really.',
      endOutcome:
        'Apply with a complete, honest career kit (skills, portfolio, CV, cover letter, LinkedIn), answer interview questions calmly with true stories, and negotiate an offer.',
      outcomes: [
        'Find and prove the skills you already have',
        'Build a portfolio without work experience',
        'Write a CV and cover letter that get read',
        'Build a LinkedIn profile recruiters trust',
        'Find hidden jobs and network when you know nobody',
        'Answer "Tell me about yourself" and common interview questions',
        'Bounce back from rejection and negotiate a job offer',
      ],
      skills: ['Job search', 'CV writing', 'Cover letters', 'LinkedIn', 'Networking', 'Interviewing', 'Negotiation'],
      upcomingUnits: 8,
      units: [u01, u02],
    },
  ],
};

export default track;
