import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 20 — Chapter Challenge: Brenda calls about a new role. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the call',
  summary: 'Thursday, the day before Clinton must answer Mr Tamba. His phone rings: Brenda Fon. "A second graduate role has opened on our offline team. Your reply to our no is part of why I\'m calling." Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole rejection toolkit together', 'See how a gracious no opens doors', 'Finish your resilience plan'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 11am',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 11am. One day before Mr Tamba needs an answer. Clinton\'s phone: Brenda Fon.' },
        { speaker: 'brenda', text: 'Clinton, a second graduate role has opened on our offline team. It\'s exactly your Kmer work. Honestly, your reply to our no, and your note about the tests, is part of why I\'m calling. Could you do a short final conversation on Monday?' },
        { speaker: 'clinton', text: 'Yes. Thank you. Can I be honest about something? I have an offer from Kmer, and I need to answer them by tomorrow.' },
        { speaker: 'brenda', text: 'Thank you for telling me. Ask them for a few more days, and we\'ll move quickly.' },
        { speaker: 'tey', text: 'A gracious no, a real plan, and several doors open. Let\'s put the chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your job-search kit so far',
      steps: [
        { title: 'Piece 1', body: 'Network map, message templates, weekly tracker.' },
        { title: 'Piece 2', body: 'Internship plan.' },
        { title: 'Piece 3', body: 'Story bank.' },
        { title: 'Piece 4 (this chapter)', body: 'Resilience plan.' },
        { title: 'Next chapter: The offer', body: 'Two possible offers, one week, and a salary lower than he hoped. Graduation day is coming.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Brenda\'s call.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why did Brenda call Clinton?',
        options: [
          { text: 'A new role fits his work, and his gracious reply and progress note stood out' },
          { text: 'Luck', why: 'His reply and his progress made the difference.' },
          { text: 'He messaged her every week', why: 'He sent one reply and one progress note.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s path since the no in order.',
        lines: ['Waited a day before replying', 'Sent a gracious reply asking for feedback', 'Turned "light on testing" into a project', 'Shared progress once', 'Got the call'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best message to Mr Tamba.',
        from: 'clinton',
        message: 'I need more time from Mr Tamba. What do I write?',
        options: [
          { text: '"Thank you again for the offer. I\'m in a final conversation with another company on Monday. Could I give you my answer by Wednesday?"' },
          { text: 'Say nothing and miss his deadline.', why: 'Be honest and ask for a short extension.' },
          { text: '"Another company wants me more, so wait."', why: 'Honest, but polite and specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s toolkit this chapter?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'No replies for 24 hours', group: 0 },
          { text: 'An angry reply', group: 1 },
          { text: 'Fact-checking the harsh voice', group: 0 },
          { text: 'Several doors open', group: 0 },
          { text: 'Ghosting the company', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would have closed this door.',
        lines: ['Thank you for letting me know.', 'Your process is a joke.', 'I\'d love to stay in touch.'],
        bug: 1,
        explanation: 'This call would never have happened.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['The birthday email', 'Wait before replying'],
          ['Brenda\'s feedback', 'Find what\'s in your control'],
          ['David\'s no', 'Listen first'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Brenda about the Kmer offer?',
        options: [
          { text: 'Honesty helps both companies plan, and she offered to move quickly' },
          { text: 'To pressure her with a fake deadline', why: 'It\'s a real offer and a real deadline.' },
          { text: 'He shouldn\'t have', why: 'Being honest about real offers is fair and common.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact or feeling?',
        groups: ['Fact', 'Feeling'],
        items: [
          { text: 'It was very close', group: 0 },
          { text: 'I\'ll never get a job', group: 1 },
          { text: 'Kmer offered me a role', group: 0 },
          { text: 'Everyone is ahead of me', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Wait, then reply [[1]]. Ask for [[2]]. Keep several doors [[3]].',
        blanks: [['graciously'], ['feedback'], ['open']],
        distractors: ['angrily', 'money', 'shut'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day is the final conversation with Njangi Pay? (one word)',
        answers: ['monday'],
        placeholder: 'A day',
      },
      {
        kind: 'mcq',
        prompt: 'What turned "light on testing" into an advantage?',
        options: [
          { text: 'A small project, made visible, then shared once' },
          { text: 'Arguing with Brenda', why: 'He acted on it instead.' },
          { text: 'Ignoring it', why: 'He acted on it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Two possible offers in one week. How are you feeling?',
        options: [
          { text: 'Excited and nervous. I\'ll prepare for Monday, ask Mr Tamba for a little time, and decide calmly.' },
          { text: 'I\'ll accept whoever pays most, today.', why: 'Weigh it calmly; next chapter shows how.' },
          { text: 'I\'ll reject Kmer now, just in case.', why: 'Keep both open until you decide.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your resilience plan. Which part would have helped you most in your last setback?',
    starters: ['The part is...', 'Because...'],
  },
  deepen: {
    title: 'Your kit, piece 4',
    summary: 'Finish your resilience plan and save it on your phone. Next chapter: how to weigh and negotiate an offer.',
  },
  notes: 'Chapter Challenge. Brenda (CastId brenda) speaks. Sets up Ch5: Njangi Pay\'s offline-team role vs Kmer\'s junior developer offer. Telling an employer about a genuine competing offer is common and fair; inventing one is the Ch5 temptation.',
};

export default lesson;
