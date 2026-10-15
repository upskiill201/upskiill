import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. "Line Check" (Tap to explore): Lucía's follow-up email after the meeting. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line Check: Lucía\'s follow-up email',
  summary: 'After a good meeting, Lucía writes the follow-up email. Tey reads it on air. "Producer, this email is doing four jobs at once. Let\'s find them."',
  minutes: 11,
  outcomes: [
    'Use a follow-up message to lock in decisions and credit',
    'Put names next to ideas and actions',
    'Make the next step impossible to miss',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s follow-up email',
      text: 'Subject: Autumn campaign: decisions and next steps. Hi team, thanks for a great meeting. Decision: we\'re focusing on student discounts plus a launch event. The student-discount idea was Sofía\'s, and Diego\'s launch-event plan made it real. Next steps: Sofía drafts the offer by Wednesday; Diego books the venue by Friday; I\'ll brief the director on Monday. If I\'ve missed anything, reply by Tuesday.',
      hotspots: [
        { phrase: 'Autumn campaign: decisions and next steps', note: 'The subject line says exactly what\'s inside. Busy people know to open it.' },
        { phrase: 'Decision: we\'re focusing on student discounts plus a launch event.', note: 'Decision first, in writing. Nobody can "remember it differently" later.' },
        { phrase: 'The student-discount idea was Sofía\'s', note: 'Credit by name, in writing. The quietest person on the team now has her idea on record.' },
        { phrase: 'Diego\'s launch-event plan made it real', note: 'Credit for Diego too. Firm in the meeting, generous after it. That\'s how you keep a Diego on side.' },
        { phrase: 'Sofía drafts the offer by Wednesday; Diego books the venue by Friday', note: 'Every action has a name and a day. No "someone should...".' },
        { phrase: 'If I\'ve missed anything, reply by Tuesday.', note: 'A clear way for anyone to add something, with a deadline. Quiet people often speak up more easily in writing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good follow-up: decisions first, credit by name, every action with a name and a day, and a clear way to add anything missed.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line Check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why put the decision in writing straight after the meeting?',
        options: [
          { text: 'To make the email longer', why: 'It\'s short on purpose.' },
          { text: 'Because Lucía forgets things', why: 'It\'s for the team, not her memory.' },
          { text: 'So nobody can remember it differently later' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which job is each line doing?',
        groups: ['Decision', 'Credit', 'Action'],
        items: [
          { text: 'We\'re focusing on student discounts plus a launch event', group: 0 },
          { text: 'The student-discount idea was Sofía\'s', group: 1 },
          { text: 'Diego books the venue by Friday', group: 2 },
          { text: 'Diego\'s launch-event plan made it real', group: 1 },
          { text: 'Sofía drafts the offer by Wednesday', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(replying to the email) Thanks for the shout-out, jefa! Venue\'s booked. Also... sorry about the TikTok thing. Old habits.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: '"Thanks, Diego! Great work on the venue. And no worries, your energy is a big part of this team."' },
          { text: '"Finally, an apology."', why: 'He\'s reaching out. Take it warmly.' },
          { text: '(no reply)', why: 'A missed chance to build the relationship.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every action in the email has a name and a ___. (one word)',
        answers: ['day', 'deadline', 'date'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the follow-up email in order.',
        lines: ['Subject: decisions and next steps', 'Thanks for the meeting', 'The decision', 'Credit by name', 'Actions with names and days', 'How to add anything missed'],
      },
      {
        kind: 'mcq',
        prompt: 'Why credit Diego in the email after being firm with him in the meeting?',
        options: [
          { text: 'To apologise for being firm', why: 'No apology needed. It\'s genuine credit.' },
          { text: 'Firm in the moment, generous after: it keeps him on side' },
          { text: 'He asked her to', why: 'He didn\'t. That\'s what makes it work.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s first draft. Which line breaks the Line Check?',
        lines: [
          'Decision: student discounts plus a launch event.',
          'Someone should probably book a venue at some point.',
          'If I\'ve missed anything, reply by Tuesday.',
        ],
        bug: 1,
        fix: 'Diego books the venue by Friday.',
        explanation: '"Someone, at some point" means no one, never. Name and day.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Firm', 'Keeps the floor'],
          ['Harsh', 'Attacks the person'],
          ['Credit in writing', 'Ideas on record'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The follow-up formula.',
        template: '[[1]] first. Credit by [[2]]. Every action with a name and a [[3]].',
        blanks: [['Decisions', 'Decision'], ['name'], ['day', 'deadline']],
        distractors: ['Someone', 'maybe'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an action line.',
        tiles: ['Diego', 'books', 'the', 'venue', 'by', 'Friday.'],
        distractors: ['someone', 'maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a recent meeting or group decision. Write a three-line follow-up: the decision, credit, and one action with a name and day.',
    starters: ['Decision: ...', 'Credit: ...', 'Action: ...'],
  },
  deepen: {
    title: 'Send the follow-up',
    summary: 'After your next meeting or group plan, be the one who sends the follow-up within an hour. Notice how often that message becomes the "official" version of what was decided.',
  },
  notes: 'Meeting follow-up structure (decisions, credit, owners and dates) is standard management practice. "Jefa" is Spanish for "boss" (affectionate). Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
