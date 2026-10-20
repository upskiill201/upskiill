import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 11 — "Founder & CEO"? Honesty choice: inflated job titles. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '"Founder & CEO"?',
  summary: 'Scrolling LinkedIn, Clinton notices that half his classmates are "Founder & CEO" of something. He technically started the CS Tech Meet-up. Should his title say "Founder & CEO, CS Tech Meet-up"?',
  minutes: 12,
  outcomes: ['Choose honest, accurate titles', 'Explain how inflated titles backfire', 'Describe a role so it sounds strong because it\'s true'],
  learn: [
    {
      kind: 'story',
      title: 'Everyone\'s a CEO',
      beats: [
        { speaker: 'narrator', text: 'Tuesday night. Clinton scrolls his classmates\' profiles. "Founder & CEO, ByteWave." "CEO, Ngum Designs." "Chief Visionary Officer, a WhatsApp group."' },
        { speaker: 'clinton', text: 'I literally started the CS Tech Meet-up. That makes me the founder. And the... CEO?' },
        { speaker: 'miracle', text: 'Does the meet-up have employees? Revenue? A board?' },
        { speaker: 'clinton', text: 'It has 40 people and a snack sponsor.' },
        { speaker: 'tey', text: 'Titles tell readers what to expect. "CEO" says "I run a company". When Brenda sees "CEO" and then reads "a student meet-up with snacks", the title stops looking impressive and starts looking like a stretch. And she starts wondering what else is stretched.' },
      ],
      choice: {
        prompt: 'What title should Clinton use?',
        options: [
          {
            text: '"Founder and organiser, CS Tech Meet-up (40 members)".',
            outcome: '"Founder" is true: he started it. "Organiser" says what he does. The number shows the scale. It sounds strong because it\'s exactly right, and nobody can poke holes in it.',
            best: true,
          },
          {
            text: '"Founder & CEO, CS Tech Meet-up".',
            outcome: 'Brenda reads "CEO", then "student meet-up". She smiles a little. Not the reaction he wanted.',
          },
          {
            text: '"Member, CS Tech Meet-up".',
            outcome: 'Too modest: he started it and runs it. Honest titles go both ways: don\'t inflate, don\'t shrink.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Use the title that\'s exactly true. Add the scale ("40 members") instead of a bigger word.',
    },
  ],
  apply: {
    scenario: 'Clinton chooses honest titles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does "CEO" of a student meet-up backfire?',
        options: [
          { text: 'It sets an expectation the description can\'t meet, so it looks like a stretch' },
          { text: 'CEO is a rude word', why: 'Not rude, just inaccurate here.' },
          { text: 'Only men can be CEOs', why: 'Not true, and not the issue. Accuracy is.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest title, inflated, or too modest?',
        groups: ['Honest', 'Inflated', 'Too modest'],
        items: [
          { text: 'Founder and organiser, CS Tech Meet-up (40 members)', group: 0 },
          { text: 'CEO, CS Tech Meet-up', group: 1 },
          { text: 'Member, CS Tech Meet-up (he founded it)', group: 2 },
          { text: 'Treasurer, UB Netball Club', group: 0 },
          { text: 'CFO, UB Netball Club', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But if everyone else says CEO, won\'t "organiser" look small?',
        options: [
          { text: 'Not with "40 members" next to it. True and specific beats big and vague.' },
          { text: 'Yes, switch to CEO.', why: 'Copying an exaggeration doesn\'t help.' },
          { text: 'Remove the meet-up entirely.', why: 'It\'s his best leadership proof. Keep it, titled honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the inflated title.',
        lines: ['Weekend assistant, phone-repair stall', 'Head of Technology, Mum\'s Njangi', 'Volunteer, church women\'s group tracker'],
        bug: 1,
        fix: 'Volunteer developer, savings-group tracker',
        explanation: '"Head of Technology" for a 12-member family savings group oversells it. Say what he did.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each inflated title to an honest one.',
        pairs: [
          ['CEO, CS Tech Meet-up', 'Founder and organiser, CS Tech Meet-up'],
          ['Technical Director, phone stall', 'Weekend assistant, phone-repair stall'],
          ['CFO, netball club', 'Treasurer, netball club'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes "Founder and organiser" sound strong?',
        options: [
          { text: 'It\'s exactly true, and "40 members" shows the scale' },
          { text: 'It has two job titles', why: 'Not the number of words: the accuracy and the scale.' },
          { text: 'It sounds like CEO', why: 'It doesn\'t try to. That\'s why it works.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Is shrinking your title ("member" instead of "founder") honest?',
        options: [
          { text: 'No: honest titles don\'t inflate or shrink' },
          { text: 'Yes, modesty is always best', why: 'Underselling hides real proof.' },
          { text: 'Only for students', why: 'Accuracy applies to everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Add the [[1]] instead of a [[2]] word.',
        blanks: [['scale', 'number'], ['bigger']],
        distractors: ['smaller', 'logo', 'emoji'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ngum looked after her club\'s money. Her honest title? (one word)',
        answers: ['treasurer'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Would it survive an interview question?',
        groups: ['Survives', 'Falls apart'],
        items: [
          { text: 'Founder and organiser (40 members)', group: 0 },
          { text: 'CEO (no company)', group: 1 },
          { text: 'Volunteer developer, savings-group tracker', group: 0 },
          { text: 'Head of Technology (family group)', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at every title on your profile or CV. Is each one exactly true, neither bigger nor smaller than the role?',
    starters: ['One title I\'d change is...', 'To...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite each title on your profile as "what you actually were" plus the scale (members, customers, budget).',
  },
  notes: 'Honesty choice per playbook §8a.7. ByteWave and "Ngum Designs" are fictional classmates\' ventures (no real companies named).',
};

export default lesson;
