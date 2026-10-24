import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the deposit. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The deposit',
  summary: 'Day 8. Flat 5 or Flat 2? Señor Vargas wants an answer by tonight. Use everything from Chapter 2 to help Lucía make the call with checked facts, not confident guesses.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Combine comparing, checking and summarising', 'Decide with checked facts'],
  learn: [
    {
      kind: 'story',
      title: 'Day 8, 6 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Señor Vargas, Flat 5\'s landlord, has answered her questions: the MX$3,000 fee is yearly, but he\'ll make it one-off if she signs for two years.' },
        { speaker: 'lucia', text: 'Flat 5 is quiet and the water\'s strong. Flat 2 is cheaper and on a main road. One evening to decide.' },
      ],
    },
    {
      kind: 'promptLab',
      title: 'Boss level: Flat 5 or Flat 2',
      task: 'Get an honest side-by-side of the two flats that helps Lucía decide, without the AI deciding for her.',
      base: 'Help me choose between Flat 5 and Flat 2.',
      parts: [
        { label: 'My notes', text: 'Here are my checked notes from both viewings and the landlord\'s answers [pasted].' },
        { label: 'Criteria', text: 'What matters: total cost over 1 and 2 years, quiet at night, commute under 30 minutes.' },
        { label: 'Table', text: 'Compare them in a table, and show the cost sums.' },
        { label: 'Unknowns', text: 'Write "unknown" for anything not in my notes, then list what I should still check.' },
        { label: 'Leading', text: 'Flat 5 is obviously better, right?' },
      ],
      replies: [
        { uses: [], text: 'Both flats sound great! Consider location, price and your personal preferences.', note: 'It knows nothing about either flat. Of course the answer is empty.' },
        { uses: [4], text: 'Yes, Flat 5 sounds like the better choice!', note: 'A leading question, a leaning answer. Nothing compared, nothing checked.' },
        { uses: [0], text: 'From your notes, Flat 5 is quieter and Flat 2 is cheaper. It depends on what matters most to you.', note: 'True, and still no help. It doesn\'t know what matters to her.' },
        { uses: [0, 1], text: 'Flat 5 wins on quiet and commute. On cost, Flat 2 is cheaper by about MX$600 a month, but Flat 5\'s one-off fee on a 2-year lease narrows the gap.', note: 'Useful. But she has to do the sums in her head on a phone.' },
        { uses: [0, 1, 2], text: '| | Flat 5 | Flat 2 |\nRent | 14,800 | 14,200 |\n1 year | 177,600 + 3,000 fee = 180,600 | 170,400 |\n2 years | 355,200 + 3,000 once = 358,200 | 340,800 |\nQuiet at night | Yes (her visit) | No (main road) |\nCommute | 25 min | 20 min |', note: 'Clear sums. One thing missing: what hasn\'t she checked yet?' },
        { uses: [0, 1, 2, 3], text: '| | Flat 5 | Flat 2 |\nRent | 14,800 | 14,200 |\n2 years total | 358,200 | 340,800 |\nQuiet at night | Yes (her visit) | No (main road) |\nCommute | 25 min | 20 min |\nGuarantor | required (clause 9) | unknown |\n\nStill to check: Flat 5\'s two-year offer in writing; whether Flat 2 needs a guarantor; the deposit is paid only after signing, in person.', note: 'Her notes, her criteria, the sums, and the gaps. Flat 5 costs about MX$725 a month more for quiet nights. That\'s her call to make, and now she can make it.' },
        { uses: [0, 1, 2, 3, 4], text: 'Yes, Flat 5 is clearly better! | Flat 5 | Flat 2 |...', note: 'Everything else was right, and then the leading question tilted it. Remove it and send again.' },
      ],
      goal: 5,
    },
  ],
  apply: {
    scenario: 'Unit Challenge: research with AI.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The AI said one-bedrooms in Roma Norte cost MX$11,000. What was the right move?',
        options: [
          { text: 'Negotiate with that number', why: 'It had no source or date.' },
          { text: 'Check current listings, and treat the AI as a starting map' },
          { text: 'Stop using AI', why: 'It helped in many other ways.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to the job.',
        pairs: [
          ['Card #2 "Compare it"', 'Flat 5 vs Flat 2'],
          ['Card #3 "Read it"', 'The 14-page lease'],
          ['A night visit', 'Noise on the street'],
          ['"What am I forgetting?"', 'The earthquake question'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Lucía check it, or was it an AI guess she threw out?',
        groups: ['Checked', 'Thrown out'],
        items: [
          { text: 'Flat 5 is quiet (night visit)', group: 0 },
          { text: 'The "2023 city study"', group: 1 },
          { text: 'Fee is yearly (clause 14)', group: 0 },
          { text: 'Flat 2 "Quiet: Yes"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Just ask "Flat 5 is better, right?" It\'ll agree and you can sleep.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Good idea.', why: 'A leading question gets a leaning answer.' },
          { text: 'It might agree because I asked it to. I want the sums and the gaps, then I\'ll decide.' },
          { text: 'I\'ll ask it three times.', why: 'Same source, three times.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The checks.',
        template: '[[1]], date, second source. Numbers and [[2]] first.',
        blanks: [['Source', 'source'], ['dates']],
        distractors: ['Vibes', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Over two years, about how much more does Flat 5 cost per month than Flat 2? (A number in pesos.)',
        answers: ['725', 'MX$725', '700', 'about 725', '725 pesos'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step is risky before signing?',
        lines: [
          'Get the two-year offer in writing.',
          'Read clauses 6, 9 and 14 herself.',
          'Transfer the deposit tonight, before seeing the contract signed.',
        ],
        bug: 2,
        fix: 'Pay the deposit only after signing, in person.',
        explanation: 'Paying before a signed contract is how people lose deposits, whether to a scam or a misunderstanding.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt is the best final check on the lease?',
        options: [
          { text: 'Is this lease fine?', why: 'Too vague to act on.' },
          { text: 'Summarise this.', why: 'Summaries can miss the costly detail.' },
          { text: 'List every fee, deadline and penalty in this lease with its clause number. [Private details removed.]' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s week of flat hunting.',
        lines: ['Check rents in real listings', 'Compare 12 flats with her criteria', 'Summarise the lease, read key clauses', 'View the flats and visit at night', 'Decide with the sums and the gaps'],
      },
      {
        kind: 'mcq',
        prompt: 'Who made the final decision?',
        options: [
          { text: 'Lucía, using AI to compare, sum and spot gaps' },
          { text: 'The AI', why: 'It organised; she decided.' },
          { text: 'Tomás', why: 'Thankfully not.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'So, which one?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Whatever the AI said.', why: 'She decided herself.' },
          { text: 'I don\'t know yet.', why: 'She has everything she needs to decide.' },
          { text: 'Flat 5, two years, offer in writing. About MX$725 a month for quiet nights. Worth it.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the honest summary of Chapter 2?',
        options: [
          { text: 'AI did the research for her', why: 'She checked everything that mattered.' },
          { text: 'AI made her fast; checking made her right' },
          { text: 'AI was wrong about everything', why: 'It compared, summarised and prepared her well.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What decision are you facing where you\'ve been relying on one source? What would a second source be?',
    starters: ['I\'m deciding...', 'A second source would be...'],
  },
  deepen: {
    title: 'Chapter 2 challenge: research something real',
    summary: 'Pick a real choice you have to make. Use your "Compare it" card with your criteria, mark the unknowns, and check the two most important facts yourself before you decide. Next chapter: an unfair MX$1,850 fee, 60 invitations, and Mamá\'s phone call: "You\'re giving the speech."',
  },
  notes: 'Unit Challenge for Chapter 2. Sums: Flat 5 2 years = 14,800×24 + 3,000 = 358,200; Flat 2 = 14,200×24 = 340,800; difference 17,400 / 24 = 725 per month. Señor Vargas narrated (Flat 5 landlord). Cliffhanger: internet provider MX$1,850 early-exit fee; Mamá: "You\'re giving the speech."',
};

export default lesson;
