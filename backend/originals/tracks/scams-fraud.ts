import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './scams-fraud/beginner/u01';
import u02 from './scams-fraud/beginner/u02';

/**
 * How Scams and Financial Fraud Work — storyline "Grace and the Scam Files".
 * A SHORT Original (5 chapters × 10 lessons) in the Personal Finance set.
 * Grace (44, UX researcher at Kinwell, Manchester; ex-ward nurse) and her son
 * Jayden (17). It starts with a text: "Hi Mum, I've dropped my phone, this is
 * my new number." Then Femi's crypto "mentor", a call from "the bank's fraud
 * team", a fake invoice at Kinwell, Jayden's "£500 to pass money through your
 * account" offer, and Femi's aunt in Lagos and a "wrong transfer". Grace builds
 * a scam file and ends up running a session at work. Device: the scam file,
 * v1–v5. General principles only: no banks, apps or brands named (playbook §9).
 * Reporting routes stated as official services, checked at time of writing.
 *
 * Running cast: Grace, Jayden, Femi, Priya (CastIds); Nan (Grace's mum, in
 * Salford), Callum, Femi's aunt (narrated).
 * Outline: docs/originals/money-track-outline.md (Part 2, course 7).
 */
const track: OriginalTrackDef = {
  slug: 'how-scams-and-financial-fraud-work',
  title: 'How Scams and Financial Fraud Work',
  category: 'Personal Finance',
  format: 'short',
  description:
    'How scams really work, from "Hi Mum" texts and fake investments to bank impersonation, money mules and online shopping fraud, and how to protect yourself, report fast and help others.',
  levels: [
    {
      level: 1,
      slug: 'how-scams-and-financial-fraud-work',
      title: 'How Scams and Financial Fraud Work',
      thumbnailUrl: '/originals/how-scams-and-financial-fraud-work.jpg',
      subtitle: 'Grace and the Scam Files: learn the tricks before they\'re used on you',
      shortDescription:
        'Scammers don\'t target the foolish; they target the busy, the kind and the worried. Learn the recipe behind every scam, spot investment, phishing, impersonation and money-mule traps, and know exactly what to do in the first hour if it happens.',
      description:
        "Grace is at her desk when the text arrives: \"Hi Mum, I've dropped my phone, this is my new number. Can you help with a bill? It's urgent.\" Her thumb is on the banking app before she remembers Jayden is at college with his phone in his hand. Over the next few weeks the scams keep coming: a colleague's crypto mentor, a call from \"the bank's fraud team\", a fake invoice at work, a £500 job offer for Jayden that could give him a criminal record, and a \"wrong transfer\" that empties a relative's mobile money in Lagos. Grace starts a scam file, the way she once kept patient notes, and by the end she's teaching the whole office. Learn how scams work, how to stop them, and what to do if one gets through.",
      startingPoint:
        'You use a phone, a bank account or the internet. No technical knowledge needed.',
      endOutcome: 'Spot the main kinds of scams, pause and verify under pressure, protect your accounts, and know exactly how to report and recover.',
      outcomes: [
        'Explain the recipe behind most scams: urgency, authority, emotion, secrecy',
        'Spot investment, crypto and romance-investment scams',
        'Recognise phishing, bank impersonation and invoice fraud',
        'Avoid money-mule recruitment, fake jobs and shopping scams',
        'Protect accounts, act in the first hour, report and help others',
      ],
      skills: ['Fraud prevention', 'Scam awareness', 'Online safety', 'Financial literacy', 'Personal finance'],
      upcomingUnits: 3,
      units: [u01, u02],
    },
  ],
};

export default track;
