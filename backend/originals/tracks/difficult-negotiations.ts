import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './difficult-negotiations/beginner/u01';
import u02 from './difficult-negotiations/beginner/u02';
import u03 from './difficult-negotiations/beginner/u03';
import u04 from './difficult-negotiations/beginner/u04';

/**
 * How to Handle Difficult Negotiations — storyline "Arjun's Big Contract".
 * A SHORT Original: one level, 5 chapters × 10 lessons. Course 2 of 3 in the
 * Negotiation & Conflict track (also covers Recognize Common Negotiation
 * Tactics and Handle Unreasonable Requests). Arjun quotes £48,000 for a
 * loyalty app; Harlow & Finch's procurement replies with £28,000 and every
 * tactic in the book. Lesson 9 of every chapter is his deal sheet.
 * Outline and research: docs/originals/how-to-handle-difficult-negotiations-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-handle-difficult-negotiations',
  title: 'How to Handle Difficult Negotiations',
  category: 'Negotiation & Conflict',
  format: 'short',
  description:
    'Stay calm under pressure, recognise common negotiation tactics, say no to unreasonable requests, use your alternatives and close a tough deal fairly.',
  levels: [
    {
      level: 1,
      slug: 'how-to-handle-difficult-negotiations',
      title: 'How to Handle Difficult Negotiations',
      subtitle: "Arjun's Big Contract: stay calm, name the tactic, get a deal you can live with",
      shortDescription:
        'Some negotiations are hard on purpose. Learn to keep your head, spot the classic pressure tactics, say no to unreasonable requests, and use your alternatives so you never sign something you regret.',
      description:
        "Arjun runs a three-person development team in Bengaluru. He quotes £48,000 to build a loyalty app for a London homeware chain, and their procurement manager replies with £28,000, a two-day deadline and \"our last supplier did it for less\". Then come the phone calls: the good cop and the bad cop, the \"my director won't allow it\", the fourteen extra features, and the three other quotes. Follow Arjun as he learns to pause instead of react, name each tactic calmly, say no without burning the bridge, strengthen his alternatives, walk away when he should, and close a deal both sides can live with. Every lesson is grounded in negotiation research, from Getting Past No to studies of anger, anchors and deadlines. No experience needed, though Negotiation Skills for Beginners is a good first step.",
      startingPoint:
        'You negotiate with people who push hard: clients, buyers, managers or suppliers. Some basic negotiation helps but is not required.',
      endOutcome:
        'Stay calm under pressure, recognise and neutralise common tactics, handle unreasonable requests, use your BATNA and walk away well, and close a fair written deal.',
      outcomes: [
        'Pause and respond instead of reacting under pressure',
        'Recognise and answer common hardball tactics',
        'Say no to unreasonable requests without damaging the relationship',
        'Strengthen your alternatives and know when to walk away',
        'Package and close a tough deal in writing',
      ],
      skills: ['Negotiation', 'Hardball tactics', 'Saying no', 'Scope control', 'BATNA', 'Composure'],
      upcomingUnits: 1,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
