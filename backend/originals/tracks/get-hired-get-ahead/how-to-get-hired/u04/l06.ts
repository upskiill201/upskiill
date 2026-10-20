import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 6 — the opening paragraph, line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The opening paragraph',
  summary: 'Clinton\'s new opening is three sentences long. Miracle says it\'s the best thing he\'s written. Tap each line to see what it does, and why the order matters.',
  minutes: 11,
  outcomes: ['Write a three-sentence opening that hooks', 'Connect your story to the company in one line', 'Name the role clearly without wasting the first line'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Clinton\'s opening',
      text: 'Dear Ms Fon,\nFor two years, my mum\'s savings group kept its accounts in a school exercise book, and every month someone swore they had paid. In March I built them a one-page tracker, and the arguments stopped. Njangi Pay is solving that same problem for 200,000 groups, which is why I\'m applying for your Graduate Developer role.',
      hotspots: [
        { phrase: 'Dear Ms Fon,', note: 'A real name. He met her at the careers fair, so he uses it. If you don\'t know a name, "Dear Njangi Pay team" is fine. Avoid "To whom it may concern".' },
        { phrase: 'For two years, my mum\'s savings group kept its accounts in a school exercise book', note: 'A picture. Brenda can see the exercise book. Stories beat statements.' },
        { phrase: 'and every month someone swore they had paid', note: 'The problem, in human terms. A little tension makes people keep reading.' },
        { phrase: 'In March I built them a one-page tracker, and the arguments stopped.', note: 'His action and the result, in one sentence. Proof before he\'s even said the job title.' },
        { phrase: 'Njangi Pay is solving that same problem for 200,000 groups', note: 'The bridge: his small story connects to their big mission. This is "why them" in a single line.' },
        { phrase: 'which is why I\'m applying for your Graduate Developer role.', note: 'The role, named at the end of the paragraph, not the start. By now Brenda wants to know what he\'s applying for.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Story first, bridge to them second, role last. Three sentences.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his opening.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the opening paragraph in order.',
        lines: ['A short story or picture', 'What you did and what changed', 'The bridge to their mission', 'The role you\'re applying for'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Clinton name the role at the end of the paragraph?',
        options: [
          { text: 'By then the reader is curious, and the first line isn\'t wasted' },
          { text: 'He forgot it earlier', why: 'It\'s on purpose. The story earns the attention first.' },
          { text: 'It\'s a rule', why: 'Not a rule, a smart choice.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good greeting, or avoid?',
        groups: ['Good', 'Avoid'],
        items: [
          { text: 'Dear Ms Fon,', group: 0 },
          { text: 'To whom it may concern,', group: 1 },
          { text: 'Dear Njangi Pay team,', group: 0 },
          { text: 'Hey guys!', group: 1 },
          { text: 'Dear Sir,', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['Kept its accounts in a school exercise book', 'A picture the reader can see'],
          ['The arguments stopped', 'The result'],
          ['Njangi Pay is solving that for 200,000 groups', 'The bridge to them'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would weaken this opening.',
        lines: ['My mum\'s njangi kept its accounts in an exercise book.', 'I am a passionate and dynamic person who loves technology.', 'Njangi Pay is solving that problem for 200,000 groups.'],
        bug: 1,
        explanation: 'Adjectives break the story. The other lines show passion without saying it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t know the hiring manager\'s name. "Dear Sir/Madam"?',
        options: [
          { text: '"Dear Njangi Pay team" or "Dear Hiring Team" works, and it\'s friendlier.' },
          { text: '"Dear Sir" is safest.', why: 'It assumes a man and sounds old. A team greeting is better.' },
          { text: 'Skip the greeting.', why: 'A greeting is still expected. Use the team.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ngum\'s opening for an accounting role at a Douala bakery chain. Which is best?',
        options: [
          { text: '"Last season my netball club\'s money lived in three notebooks and a WhatsApp chat. I built one cash book and we finished with a surplus. You run 12 bakeries on tight margins, which is why I\'m applying for your Junior Accountant role."' },
          { text: '"I am writing to apply for the Junior Accountant role."', why: 'The most-read line, wasted.' },
          { text: '"I love bread."', why: 'Charming, but no proof and no bridge.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the order.',
        template: 'Story [[1]], bridge to them second, role [[2]].',
        blanks: [['first'], ['last']],
        distractors: ['never', 'twice', 'middle'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many sentences is a strong opening paragraph? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why "a picture the reader can see"?',
        options: [
          { text: 'Concrete details are remembered; abstract claims aren\'t' },
          { text: 'Recruiters like art', why: 'It\'s about memory, not art.' },
          { text: 'To make it longer', why: 'It\'s one short sentence.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own three-sentence opening for a role you want: story, bridge, role.',
    starters: ['Story: ...', 'Bridge: ...', 'Role: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write three different openings for the same role. Read each to a friend. Ask which one made them want to read the next line.',
  },
  notes: 'Opening structure (concrete story, bridge to the employer, role named last) is a common careers-coach technique. Greeting guidance: use a name if known, otherwise a team greeting; avoid gendered "Dear Sir".',
};

export default lesson;
