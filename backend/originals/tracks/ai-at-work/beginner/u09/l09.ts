import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 9 — disagreeing politely. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Disagreeing politely',
  summary: 'Carmen wants to pause the whole pilot for a month. Ada thinks that would hurt the shops more. She has to disagree with a client, in writing, without making it worse.',
  minutes: 12,
  outcomes: [
    'Disagree in writing without sounding defensive',
    'Lead with shared goals and evidence',
    'Offer an alternative, not just a "no"',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to disagree well',
      steps: [
        { title: '1. Show you understand', body: '"I understand why a pause feels safer after Monday."' },
        { title: '2. Name the shared goal', body: '"We both want shops to trust the app."' },
        { title: '3. Give your view with evidence', body: '"Pausing a month means 50 shops go back to cash; in our week 4 data, 6 shops that stopped for a week never came back."' },
        { title: '4. Offer an alternative', body: '"Instead: keep going with the new alert, and a daily check-in for two weeks."' },
        { title: '5. Leave the decision open', body: '"Happy to discuss on Thursday. It\'s your call."' },
        { title: 'With AI', body: '"Here\'s my view and evidence. Draft a polite disagreement in these five steps. Make sure it doesn\'t sound defensive."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Understand, shared goal, evidence, alternative, their call. Disagree with the idea, never the person.',
    },
  ],
  apply: {
    scenario: 'Ada disagrees with Carmen\'s pause.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Show you understand', 'Name the shared goal', 'Give your view with evidence', 'Offer an alternative', 'Leave the decision open'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Polite disagreement, or defensive?',
        groups: ['Polite', 'Defensive'],
        items: [
          { text: '"I understand why a pause feels safer"', group: 0 },
          { text: '"That\'s a bad idea"', group: 1 },
          { text: '"Instead, we could add daily check-ins"', group: 0 },
          { text: '"You\'re overreacting"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request drafts the best disagreement?',
        options: [
          { text: 'Tell her she\'s wrong, nicely.', why: 'Still framed as "wrong".' },
          { text: 'Here\'s my view and evidence. Draft a polite disagreement: show I understand, shared goal, evidence, an alternative, and leave the decision with her. Not defensive.' },
          { text: 'Agree with whatever she says.', why: 'Shops would lose out.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why name a shared goal?',
        options: [
          { text: 'To flatter her', why: 'It reframes the disagreement.' },
          { text: 'It shows you\'re on the same side, arguing about how, not whether' },
          { text: 'It\'s filler', why: 'It changes the tone.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the email worse?',
        lines: [
          'I understand why a pause feels safer after Monday.',
          'We both want shops to trust the app.',
          'Honestly, pausing would be a panic reaction.',
          'Instead, keep going with daily check-ins for two weeks.',
        ],
        bug: 2,
        fix: 'In our data, shops that paused for a week often didn\'t come back.',
        explanation: '"Panic reaction" criticises Carmen. Use evidence instead.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen read your email. She says "fair point, let\'s try the check-ins". How did you manage that?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I told her she was wrong.', why: 'She didn\'t.' },
          { text: 'Luck.', why: 'It was the approach.' },
          { text: 'I showed I understood her worry, used our own data, and offered an alternative instead of just saying no.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Disagree with the [[1]], never the [[2]].',
        blanks: [['idea'], ['person']],
        distractors: ['data', 'goal'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the week 4 data, how many shops that stopped for a week never came back?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Ada\'s line.',
        pairs: [
          ['Understand', 'A pause feels safer after Monday'],
          ['Shared goal', 'Shops trusting the app'],
          ['Alternative', 'Daily check-ins for two weeks'],
          ['Their call', 'It\'s your decision'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the shared goal line.',
        tiles: ['We', 'both', 'want', 'shops', 'to', 'trust', 'the', 'app'],
        distractors: ['I'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence, or opinion?',
        groups: ['Evidence', 'Opinion'],
        items: [
          { text: '6 paused shops never came back', group: 0 },
          { text: 'A pause would be silly', group: 1 },
          { text: 'The new alert caught a test error in 2 minutes', group: 0 },
          { text: 'I just feel it\'s wrong', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why leave the decision with Carmen?',
        options: [
          { text: 'She\'s the client; respecting that makes her more open to your view' },
          { text: 'To avoid responsibility', why: 'It respects her role.' },
          { text: 'It doesn\'t matter', why: 'It changes how she reads it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision you disagree with at work. Write the five steps for it.',
    starters: ['Shared goal:', 'Alternative:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to check one disagreement you\'ve written: "Does this sound defensive? Make it about the idea, not the person."' },
  notes: 'Fictional data.',
};

export default lesson;
