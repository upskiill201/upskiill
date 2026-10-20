import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import n01 from './get-hired-get-ahead/how-to-get-noticed/u01';
import n02 from './get-hired-get-ahead/how-to-get-noticed/u02';
import n03 from './get-hired-get-ahead/how-to-get-noticed/u03';
import n04 from './get-hired-get-ahead/how-to-get-noticed/u04';
import n05 from './get-hired-get-ahead/how-to-get-noticed/u05';

/**
 * Get Hired, Get Ahead (Career). Outline: docs/originals/get-hired-get-ahead-outline.md
 * (approved 2026-10-20). Founder, 2026-10-20: each course has 5 chapters, so
 * the track is three 'focused' levels (5 chapters × 20 lessons each):
 *
 *   1. How to Get Noticed by Employers ("Clinton Gets Noticed"): skills,
 *      portfolio, CV, cover letter, LinkedIn.
 *   2. How to Get Hired ("Clinton Gets Hired"): hidden jobs and networking,
 *      internship, the interview, rejection, the offer.
 *   3. How to Get Ahead at Work ("Clinton's First Year"): first 90 days,
 *      becoming more valuable, promotion, a career plan, changing careers.
 *
 * Clinton (21, final-year Computer Science, University of Buea) goes from
 * "I don't have any experience" to an offer from Njangi Pay (a fictional
 * Douala fintech), then through his first year there. Miracle (team lead at
 * Afiya, Lagos) coaches him from the hiring side. Learners build their own
 * career kit as they go. Replaces the old Acing Job Interviews plan.
 * "Find my level" placement is on (PLACEMENT_TRACKS).
 */
const track: OriginalTrackDef = {
  slug: 'get-hired-get-ahead',
  title: 'Get Hired, Get Ahead',
  category: 'Career',
  format: 'focused',
  description: 'Land your first job and grow in it: skills, portfolio, CV, cover letter, LinkedIn, networking, interviews, offers, and your first year at work.',
  levels: [
    {
      level: 1,
      slug: 'how-to-get-noticed',
      title: 'How to Get Noticed by Employers',
      subtitle: 'Clinton Gets Noticed: from "I have no experience" to an interview invitation',
      shortDescription:
        'Find the skills you already have, build proof without a job, and write a CV, cover letter and LinkedIn profile that recruiters actually read.',
      description:
        "\"So what can you do?\" At the careers fair, Clinton says, \"Well, I don't have any experience yet...\" and watches the recruiter's eyes glaze over. Follow Clinton, a final-year Computer Science student in Buea, Cameroon, as he discovers the skills he already has, builds a real project for his mum's savings group, and turns it all into a one-page CV, a cover letter the recruiter quotes back to him, and a LinkedIn profile that gets found. His mentor, Miracle, hires people for a living, so you see every step from the other side of the desk. As you go, you build your own career kit in your own words, with advice that works wherever you live. Ten-minute lessons, made for your phone.",
      startingPoint: 'Students, graduates, and anyone looking for their first job or their next one. No experience needed, really.',
      endOutcome:
        'Apply with an honest, complete career kit: a skills inventory with proof, a portfolio piece, a tailored one-page CV, a specific cover letter and a professional LinkedIn profile.',
      outcomes: [
        'Find and prove the skills you already have',
        'Build a portfolio piece without work experience',
        'Write a one-page CV with achievement bullets',
        'Write a cover letter that says why them and why you',
        'Build a LinkedIn profile recruiters find and trust',
      ],
      skills: ['Job search', 'CV writing', 'Cover letters', 'LinkedIn', 'Portfolio', 'Transferable skills'],
      thumbnailUrl: '/originals/how-to-get-noticed.jpg',
      upcomingUnits: 0,
      units: [n01, n02, n03, n04, n05],
    },
  ],
};

export default track;
