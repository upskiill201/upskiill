import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 13 — "Do you have any questions for us?" Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: '"Any questions for us?"',
  summary: 'At the end of the mock interview, Mrs Ewane asked, "Any questions for me?" Clinton said, "No, I think you covered everything." She wrote one word on her clipboard. Tey explains why that answer is a missed chance.',
  minutes: 11,
  outcomes: ['Prepare good questions to ask at the end', 'Use questions to learn if the job fits you', 'Avoid questions that hurt you'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: '"No questions" can sound like you\'re not very interested. The end of an interview is your turn to interview them. What would you actually want to know about a job before you take it?',
          replies: ['What the work is really like', 'Whether I\'d learn'],
        },
        {
          tey: 'Exactly. Good questions are real ones: "What would success look like in the first three months?" "What\'s the biggest challenge the team has right now?" "How do new graduates learn here?"',
          replies: ['Any to avoid?'],
        },
        {
          tey: 'Avoid things on their website ("What do you do?"), and in a first interview, leading with holidays or pay can look like that\'s all you care about. Pay is a fair question, and it usually comes up with the recruiter or at the offer stage.',
          replies: ['How many should I ask?'],
        },
        {
          tey: 'Prepare four or five, because some will get answered during the interview. Ask two or three. One great final one: "Is there anything about my background that you\'d like me to say more about?" It gives you a chance to fix a weak answer.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Always have questions. Real ones about the work, the team and learning. Prepare five, ask two or three.',
    },
  ],
  apply: {
    scenario: 'Clinton prepares questions for Njangi Pay.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "No, you covered everything" a missed chance?',
        options: [
          { text: 'It\'s rude', why: 'Not rude, just a missed chance.' },
          { text: 'It can sound uninterested, and wastes your turn to learn about them' },
          { text: 'It\'s fine', why: 'It\'s a missed chance.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question, or avoid in a first interview?',
        groups: ['Good', 'Avoid'],
        items: [
          { text: 'What would success look like in three months?', group: 0 },
          { text: 'What does your company do?', group: 1 },
          { text: 'How do new graduates learn here?', group: 0 },
          { text: 'How many holidays do I get? (as your first question)', group: 1 },
          { text: 'What\'s the team\'s biggest challenge?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best final question.',
        from: 'clinton',
        message: 'I\'ve asked two questions. What\'s a great last one?',
        options: [
          { text: '"Did I get the job?"', why: 'They won\'t know yet. Give yourself a chance to add something.' },
          { text: '"Can I go now?"', why: 'End on something useful.' },
          { text: '"Is there anything about my background you\'d like me to say more about?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the question Clinton should cut.',
        lines: ['What would success look like in three months?', 'What year was Njangi Pay founded?', 'How do new graduates learn here?'],
        bug: 1,
        explanation: 'It\'s on their website. Ask what only they can tell you.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s question plan in order.',
        lines: ['Prepare five real questions', 'Cross off ones answered during the interview', 'Ask two or three', 'End with "anything to say more about?"'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what Clinton learns.',
        pairs: [
          ['Success in three months?', 'What they\'ll expect of him'],
          ['Biggest challenge?', 'What problems he\'d work on'],
          ['How do graduates learn?', 'Whether he\'d grow there'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When does pay usually come up for a graduate role?',
        options: [
          { text: 'With the recruiter or at the offer stage' },
          { text: 'As your first question to the hiring manager', why: 'Fair question, better timed later.' },
          { text: 'Never', why: 'It\'s fair, just usually later.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Prepare [[1]], ask two or [[2]].',
        blanks: [['five', '5'], ['three', '3']],
        distractors: ['none', 'twenty', 'one'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many months does Clinton ask about in his "success" question? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps you decide if the job fits, or not?',
        groups: ['Helps decide', 'Doesn\'t help'],
        items: [
          { text: 'How is feedback given here?', group: 0 },
          { text: 'What colour is the logo?', group: 1 },
          { text: 'What does a normal week look like?', group: 0 },
          { text: 'Who founded it? (on the website)', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do you really want to know about your next job before you accept it? Turn it into one interview question.',
    starters: ['I want to know...', 'My question:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write five questions for an interview you\'d like. Circle the two you\'d ask first.',
  },
  notes: 'Common interview guidance. Where you live: when salary is discussed, and how directly, varies; some countries require pay ranges in adverts. Check locally.',
};

export default lesson;
