import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 6 — first paid lesson. Audience: the single detail that changes tone, length and words. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: "Say who it's for",
  summary: 'The same facts, written for your manager, a client or a new colleague, are three different messages.',
  minutes: 12,
  outcomes: [
    'Describe the reader in one useful phrase',
    'See how the reader changes tone, length and words',
    'Rewrite one message for two different readers',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One reader description, four effects',
      text:
        'Write this update for Lucía, a busy client who reads on her phone between meetings and does not know our technical terms.',
      hotspots: [
        { phrase: 'Lucía, a busy client', note: 'A client, not a teammate: warmer, more careful, no internal shortcuts.' },
        { phrase: 'reads on her phone between meetings', note: 'This quietly asks for short lines and the important part first.' },
        { phrase: 'does not know our technical terms', note: 'The AI will now swap "QA regression" for "final testing".' },
      ],
    },
    {
      kind: 'compare',
      title: 'Same facts, different reader',
      before: {
        label: 'For the developers',
        text: 'Sign-up QA found a validation bug on the email field. Fix merged; regression run Friday. Palette sign-off still blocked on client.',
      },
      after: {
        label: 'For Lucía',
        text: 'Good news: sign-up is nearly ready. We found and fixed a small bug, and final testing is on Friday. The one thing we need from you is your OK on the colours.',
      },
      notes: ['No jargon for a client.', 'Good news first.', 'Her action is spelled out.'],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Describe the reader the way you would to a new colleague: who they are, how they read, and what they already know.',
    },
    {
      kind: 'check',
      question: 'Which reader description helps the AI most?',
      options: ['"For someone"', '"For my manager, who likes three bullets and no small talk"', '"For an important person"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is writing the same news for different people.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does saying who it is for change in the answer?',
        options: [
          { text: 'Only the greeting', why: 'It changes far more: words, length, what comes first.' },
          { text: 'Tone, length and which words it uses' },
          { text: 'Nothing, the facts are the same', why: 'Same facts, very different message.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which version fits which reader?',
        groups: ['Developers', 'Lucía (client)'],
        items: [
          { text: 'Fix merged; regression run Friday', group: 0 },
          { text: 'We fixed a small bug, and final testing is Friday', group: 1 },
          { text: 'Validation bug on the email field', group: 0 },
          { text: 'We just need your OK on the colours', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a useful reader description.',
        tiles: ['For', 'a', 'busy', 'client', 'who', 'reads', 'on', 'her', 'phone'],
        distractors: ['someone', 'robot'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Sorry, what does "regression run" mean? Is something wrong?',
        prompt: 'Ada sent a developer-style update. Which follow-up is best?',
        options: [
          { text: 'It is a standard QA process for verifying builds.', why: 'Still jargon. She asked because she does not know the terms.' },
          { text: 'Please ask your technical team.', why: 'She is the client. Make it easy for her.' },
          { text: "Nothing's wrong! It just means final testing. Sign-up is on track for Friday." },
        ],
        answer: 2,
        explanation: 'Next time, say the reader in the request: "Lucía does not know technical terms".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reader to what they need.',
        pairs: [
          ['Busy manager', 'Short, decision first'],
          ['Client', 'Warm, no jargon'],
          ['New colleague', 'Context and explanations'],
          ['Developer', 'Exact technical details'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the reader description.',
        template: 'For my [[1]], who likes three [[2]] and reads it before her [[3]] meeting.',
        blanks: [['manager'], ['bullets'], ['9am', 'morning']],
        distractors: ['cat', 'novels'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía reads on her phone. So the message should be ... (one word)',
        answers: ['short', 'brief', 'shorter'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem: which line is wrong for this reader (a new colleague on day one)?',
        lines: [
          'Welcome to the team!',
          'Ping QA on the EVT ticket before the sync.',
          'Your first week is mostly meeting people and reading the project notes.',
          'Ask me anything, any time.',
        ],
        bug: 1,
        fix: 'Before Thursday\'s team meeting, I\'ll show you how we track bugs.',
        explanation: 'A day-one colleague doesn\'t know "QA", "EVT" or "the sync" yet.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada needs to explain the delay to her manager. Which request is best?',
        options: [
          { text: 'Explain the delay.', why: 'To whom? Her manager wants something different from a client.' },
          {
            text: 'Explain the 2-day testing delay to my manager, who wants the cause, the new date and any risk, in 3 bullets.',
          },
          { text: 'Explain the delay nicely so nobody is upset.', why: '"Nicely" without a reader is a guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of a good reader description.',
        lines: ['Who they are', 'How they will read it', 'What they already know'],
      },
    ],
  },
  reflect: {
    prompt: 'Who reads most of your work messages? Write the one-line reader description you could reuse for them.',
    starters: ['For ..., who...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Take one message and ask an AI tool for two versions: one for your manager, one for someone new. Compare them.',
  },
  notes: 'Jargon examples are generic software terms. No statistics.',
};

export default lesson;
