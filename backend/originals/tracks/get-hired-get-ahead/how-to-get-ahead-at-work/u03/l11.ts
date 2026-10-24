import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 11 — story choice: a recruiter offers "Developer, right now" at another company. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The recruiter\'s message',
  summary: 'Halfway through his plan, a recruiter messages Clinton: "A Yaoundé fintech wants you as a Developer. Title now, more money." It\'s tempting. Should he take the call? Use it to push Ngozi? Ignore it?',
  minutes: 11,
  outcomes: ['Handle outside interest honestly', 'Compare an outside offer with your plan', 'Avoid using offers as empty threats'],
  learn: [
    {
      kind: 'story',
      title: 'A LinkedIn message',
      beats: [
        { speaker: 'narrator', text: 'Month seven. A LinkedIn message: "Hi Clinton! A fast-growing Yaoundé fintech is hiring Developers. Your offline work is exactly what they need. Title now, about 20% more. Call this week?"' },
        { speaker: 'clinton', text: '(to himself) Developer, right now. Or I could tell Ngozi I have an offer and get promoted faster.' },
        { speaker: 'tey', text: 'Outside interest is normal and flattering. Learning about it is fine. Using it as a threat you wouldn\'t carry out is risky, and the title is only one part of what a job gives you.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Take a short call to learn, then compare honestly: title, money, learning, team, and his plan with Ngozi.',
            outcome: 'The role is mostly maintenance, with no senior developers to learn from. He thanks the recruiter, stays on his plan, and keeps the contact for the future.',
            best: true,
          },
          {
            text: 'Tell Ngozi: "Promote me now or I\'ll leave," without really meaning it.',
            outcome: 'Ngozi: "I can\'t change the cycle. If it\'s right for you, you should go." Now he has to leave, or back down.',
          },
          {
            text: 'Accept the title on the spot to feel ahead.',
            outcome: 'A bigger title, a smaller job. Three months later he misses learning from Paul and Ngozi.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Learn about outside interest. Compare the whole job, not the title. Never make a threat you wouldn\'t carry out.',
    },
  ],
  apply: {
    scenario: 'The recruiter\'s message.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Is it wrong to take a recruiter\'s call?',
        options: [
          { text: 'Yes, it\'s disloyal', why: 'Learning is fine; honesty matters.' },
          { text: 'No: learning about outside interest is normal' },
          { text: 'Only on weekdays', why: 'It\'s normal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compare this, or just the title?',
        groups: ['Compare', 'Just surface'],
        items: [
          { text: 'Who he\'d learn from', group: 0 },
          { text: 'The word "Developer" in his email signature', group: 1 },
          { text: 'What the work actually is', group: 0 },
          { text: 'The whole pay and benefits', group: 0 },
          { text: 'How impressive it sounds to friends', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to the recruiter.',
        from: 'clinton',
        message: 'After the call, what do I tell the recruiter?',
        options: [
          { text: 'Nothing, ghost them.', why: 'A short thank-you keeps the door open.' },
          { text: '"Pay me double and I\'ll think about it."', why: 'If it\'s not right, say so kindly.' },
          { text: '"Thanks so much. It\'s not the right fit for me now, but I\'d love to stay in touch."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risky move.',
        lines: ['Takes a short call to learn.', 'Tells Ngozi "promote me or I leave", not meaning it.', 'Compares learning and team, not just title.'],
        bug: 1,
        explanation: 'An empty threat can force you to leave or back down.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Learn, then compare honestly', 'Stays on plan, keeps the contact'],
          ['Empty threat', 'Has to leave or back down'],
          ['Accept for the title', 'Bigger title, smaller job'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Take a short call', 'Learn what the role really is', 'Compare the whole job with his plan', 'Decide and reply kindly'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When is it fair to mention an outside offer to your manager?',
        options: [
          { text: 'When it\'s real and you\'d genuinely consider taking it' },
          { text: 'Whenever you want a promotion faster', why: 'Only if real and you\'d consider it.' },
          { text: 'Never, ever', why: 'Honesty about real offers can be fair.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Compare the whole [[1]], not the [[2]].',
        blanks: [['job'], ['title']],
        distractors: ['email', 'office', 'logo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how much more money did the recruiter mention, in percent? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or manipulative?',
        groups: ['Honest', 'Manipulative'],
        items: [
          { text: 'Mentioning a real offer you\'re weighing', group: 0 },
          { text: 'Threatening to leave without meaning it', group: 1 },
          { text: 'Saying it\'s not the right fit', group: 0 },
          { text: 'Inventing a second offer', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If someone offered you a bigger title somewhere else, what would you compare besides the title?',
    starters: ['I\'d compare...', 'The most important thing would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "whole job" comparison list: learning, team, work, pay, growth, title. Keep it for the next offer.',
  },
  notes: 'Outside offers and counter-offers are common; norms vary. Never bluff. The Yaoundé fintech is unnamed and fictional.',
};

export default lesson;
