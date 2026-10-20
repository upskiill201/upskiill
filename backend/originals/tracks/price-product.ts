import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './price-product/beginner/u01';
import u02 from './price-product/beginner/u02';

/**
 * How to Price a Product or Service — storyline "Clinton's Price Card".
 * A SHORT Original (founder, 2026-10-20): one level, 5 chapters × 10 lessons.
 * Course 2 of 3 in the Business set. WashDay works, but Clinton guessed his
 * price (1,500 FCFA a bag) and is busy and nearly broke. He goes from a
 * guessed price to a price card that pays him and that customers accept.
 * Lesson 9 of every chapter is the price card. Outline and research:
 * docs/originals/price-a-product-or-service-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'price-a-product-or-service',
  title: 'How to Price a Product or Service',
  category: 'Business',
  format: 'short',
  description:
    'Charge what it is worth, cover every cost and keep your customers: unit costs, margins, value-based pricing, options, discounts and price rises.',
  levels: [
    {
      level: 1,
      slug: 'how-to-price-a-product-or-service',
      title: 'How to Price a Product or Service',
      subtitle: "Clinton's Price Card: charge what it's worth and keep your customers",
      shortDescription:
        'Most small businesses guess their price, then wonder why they are busy and broke. Learn what a sale really costs, what it is worth to customers, and how to set, test and raise prices without losing the people who matter.',
      description:
        "Clinton's laundry pickup service, WashDay, works: students pay and come back. But he guessed his price, and the numbers are ugly. Some orders lose money, and his weekends earn him less than a campus job would. Follow Clinton as he works out what one bag really costs, what the service is worth to the students who use it, how to offer options for different customers, what discounts really cost, and how to raise prices without losing his regulars. You'll do the sums in every lesson, with round numbers and a phone calculator, and price something of your own as you go: a product, a service or your own time. No business experience needed.",
      startingPoint:
        'You sell something, or plan to: a product, a service, freelance work or a side-hustle. You can do simple sums with a calculator. No experience needed.',
      endOutcome:
        'Work out your real costs and margins, set a price from the value you deliver, design options, and test and raise prices without losing good customers.',
      outcomes: [
        'Work out the full cost of one sale, including your own time',
        'Calculate margin, break-even and what a discount really costs',
        'Set a price from the value customers get, not just your costs',
        'Design options and tiers that each make money',
        'Raise and defend prices without losing your best customers',
      ],
      skills: ['Pricing', 'Unit economics', 'Margins', 'Break-even analysis', 'Value-based pricing', 'Entrepreneurship'],
      upcomingUnits: 3,
      units: [u01, u02],
    },
  ],
};

export default track;
