import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 20 — Chapter Challenge: Mr Tamba's six-week review; Brenda sets the interview date. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the six-week review',
  summary: 'Six weeks in, Mr Tamba calls each intern in for a review. Clinton brings his wins log. Then, on the bus home, an email from Brenda Fon at Njangi Pay: their hiring round moved, and his interview is now on the 14th. Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use briefs, updates, feedback and proof together', 'Show what changed in a review', 'Finish your internship plan'],
  learn: [
    {
      kind: 'story',
      title: 'The review',
      beats: [
        { speaker: 'narrator', text: 'Six weeks in. Mr Tamba\'s tiny office. Clinton opens his wins log: six lines, six numbers.' },
        { speaker: 'narrator', text: 'Mr Tamba reads it twice. "Eleven drivers now. Zero lost confirmations. You shared credit with Nadia, and you told me about risks before they happened. Whatever happens, I\'ll be your reference."' },
        { speaker: 'narrator', text: 'On the bus home, an email from Brenda Fon: "Hi Clinton, sorry for the wait: our hiring round moved. Your interview for the Graduate Developer role is now confirmed for the 14th, 10am, at our Douala office."' },
        { speaker: 'clinton', text: 'Two weeks. The real interview. And now I have a story for every question.' },
        { speaker: 'tey', text: 'Let\'s put the chapter together first.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your job-search kit so far',
      steps: [
        { title: 'Piece 1', body: 'A network map, message templates and a weekly tracker.' },
        { title: 'Piece 2 (this chapter)', body: 'An internship plan: what you\'ll learn, where you\'ll look, your first weeks, your habits, how you\'ll leave.' },
        { title: 'Next chapter: The interview', body: 'Clinton freezes on "Tell me about yourself" in a practice run with David. Then he walks into Njangi Pay.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the six-week review.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Clinton bring to his review?',
        options: [
          { text: 'A list of his working hours', why: 'Results, not hours.' },
          { text: 'His wins log: six lines, six numbers' },
          { text: 'Nothing, he winged it', why: 'He brought proof.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s internship in order.',
        lines: ['Found the biggest worry', 'Agreed what "done" means', 'Gave four-line Friday updates', 'Asked for specific feedback', 'Brought his wins log to the review'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Why Mr Tamba trusts him: real reason, or not?',
        groups: ['Real reason', 'Not a reason'],
        items: [
          { text: 'Zero lost confirmations', group: 0 },
          { text: 'He looked busy', group: 1 },
          { text: 'He flagged risks early', group: 0 },
          { text: 'He shared credit with Nadia', group: 0 },
          { text: 'He stayed late', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak Friday update line.',
        lines: ['Done: sync works on three phones.', 'I was really busy all week.', 'Risk: two very old phones.'],
        bug: 1,
        explanation: 'Activity, not a result.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to Mr Tamba.',
        from: 'clinton',
        message: 'Mr Tamba says he\'ll be my reference. What should I say?',
        options: [
          { text: '"Great, write whatever you want."', why: 'Offer to keep him updated and remind him of the facts.' },
          { text: '"Can you exaggerate a bit?"', why: 'Never. Honest references only.' },
          { text: '"Thank you. I\'ll tell you before anyone calls, and what role it\'s for."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['Reading the five-line brief', 'Agree what "done" means'],
          ['Two days stuck on storage', 'Try first, then ask with what you tried'],
          ['Nadia\'s presentation', 'Talk privately, keep written updates'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was the fair way to get help from Miracle?',
        options: [
          { text: 'Ask for advice on the bug, not a shortcut into Afiya' },
          { text: 'Ask her to get him in', why: 'That asks her to vouch for unseen work.' },
          { text: 'Use her name without asking', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'A small start-up internship counts on a CV', group: 0 },
          { text: 'Not kept on means wasted', group: 1 },
          { text: 'Interns can ask for references', group: 0 },
          { text: 'Interns only make tea', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Get it in [[1]]. Results, not [[2]]. Leave with a [[3]].',
        blanks: [['writing'], ['hours'], ['reference']],
        distractors: ['secret', 'excuses', 'grudge'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many drivers now use Clinton\'s tool? (a number)',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which feedback question did Clinton learn to ask?',
        options: [
          { text: '"Any feedback?"', why: 'Too open.' },
          { text: '"Am I the best?"', why: 'Not useful.' },
          { text: '"What\'s one thing I could do better on the driver tests?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your interview is in two weeks. What from Kmer will help you most?',
        options: [
          { text: 'Nothing, it\'s a different company.', why: 'His Kmer stories are perfect interview material.' },
          { text: 'Real stories with numbers: the offline confirmations, the risk I flagged, how I handled Nadia.' },
          { text: 'My working hours.', why: 'Stories with results.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your internship plan. Which part will be hardest for you, and what\'s your first step this week?',
    starters: ['The hardest part is...', 'My first step:'],
  },
  deepen: {
    title: 'Your kit, piece 2',
    summary: 'Finish your one-page internship plan. If you\'re in any role now, write your first wins-log line today.',
  },
  notes: 'Chapter Challenge. Reviews the whole chapter. Brenda Fon (CastId brenda) is narrated here; she appears in person in Ch3. Interview on "the 14th" (month unstated) keeps the countdown flexible.',
};

export default lesson;
