import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './investment-risk/beginner/u01';
import u02 from './investment-risk/beginner/u02';
import u03 from './investment-risk/beginner/u03';
import u04 from './investment-risk/beginner/u04';

/**
 * How to Understand Investment Risk — storyline "Arjun's Windfall".
 * A SHORT Original (5 chapters × 10 lessons) in the Personal Finance set.
 * Arjun (freelance developer, Bengaluru; after Arjun's Big Contract). The
 * Harlow & Finch contract leaves him ₹12 lakh after paying Kavya and Joel and
 * setting tax aside. Cousin Vikram (narrated) swears by options trading, his
 * uncle (narrated) wants land near Mysuru, a WhatsApp group promises "3% a
 * month guaranteed", and Kavya says "put it all in crypto". Grace is his
 * sounding board from Manchester. Device: Arjun's risk map, v1–v5.
 * General principles only: no products, no personal investment advice
 * (playbook §9). Growth and fall examples use stated example numbers.
 *
 * Running numbers:
 * - Windfall ₹12,00,000 (₹12 lakh). Existing savings ₹1,50,000.
 * - Monthly costs ₹60,000 (rent ₹22,000 in Indiranagar). Freelance income
 *   uneven: ₹80,000 to ₹2,50,000 a month.
 * - Amma and Appa in Mysuru; Appa retired, small pension.
 * Outline: docs/originals/money-track-outline.md (Part 2, course 6).
 */
const track: OriginalTrackDef = {
  slug: 'how-to-understand-investment-risk',
  title: 'How to Understand Investment Risk',
  category: 'Personal Finance',
  format: 'short',
  description:
    'What investment risk really is, the different kinds, how time and goals change it, how spreading money out reduces it, and how to spot offers that are too good to be true.',
  levels: [
    {
      level: 1,
      slug: 'how-to-understand-investment-risk',
      title: 'How to Understand Investment Risk',
      thumbnailUrl: '/originals/how-to-understand-investment-risk.jpg',
      subtitle: 'Arjun\'s Windfall: ₹12 lakh, five loud opinions, and one calm plan',
      shortDescription:
        'Everyone has a tip. Few people can explain risk. Learn what risk really means, the kinds that catch people out, how your time horizon changes everything, why spreading money out works, and how to spot "guaranteed" offers before they cost you.',
      description:
        "Arjun just finished the biggest contract of his life. After paying his team and setting tax aside, ₹12 lakh is sitting in his account, more money than he has ever had. Within a week, everyone has a plan for it: his cousin's options trading, his uncle's plot of land, Kavya's crypto, and a WhatsApp group promising 3% a month, guaranteed. Arjun writes code for a living, so he decides to do what he does with any system: understand how it can fail before he trusts it. Follow him as he learns what risk really is, maps every kind of it, matches money to time, spreads it out, and learns to say no to offers that are too good to be true. No tips, no products: just how risk works, explained simply.",
      startingPoint:
        'You have some money, or will soon, and want to understand risk before investing any of it. No investing knowledge needed.',
      endOutcome: 'Judge any investment by its risks, match money to your goals and time, spread risk sensibly, and walk away from offers that are too good to be true.',
      outcomes: [
        'Explain risk, return and volatility in plain words',
        'Name the main kinds of risk, including the risk of doing nothing',
        'Match money to goals using time horizon and risk capacity',
        'Explain how diversification and fees affect risk and return',
        'Spot guaranteed-return red flags and the psychology behind bad bets',
      ],
      skills: ['Investment risk', 'Diversification', 'Risk management', 'Financial literacy', 'Personal finance'],
      upcomingUnits: 1,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
