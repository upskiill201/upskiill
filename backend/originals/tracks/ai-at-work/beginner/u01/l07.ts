import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 7 — giving an example of what good looks like. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Show it what good looks like',
  summary: 'Describing the style you want is hard. Showing one example is easy, and works better.',
  minutes: 12,
  outcomes: [
    'Give the AI an example to copy the style of',
    'Say what to keep from the example and what to change',
    'Use a "not like this" example to steer away from a style',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Show, don\'t describe',
      html:
        '<p>Ada wants her weekly update to sound like the one her manager praised last month: short, warm, a little bit funny. She types "make it short, warm and a bit funny". The result is short, warm, and trying very hard to be funny.</p>' +
        '<p>Words like <em>warm</em> and <em>funny</em> mean different things to different people. An example means one thing.</p>' +
        '<h3>The pattern</h3>' +
        '<ol>' +
        '<li><strong>Paste the example.</strong> A real message you liked, or one that worked.</li>' +
        '<li><strong>Say what to copy.</strong> "Match the length, the tone and the way it ends with one question."</li>' +
        '<li><strong>Say what is different.</strong> "But it\'s about this week\'s news: [facts]."</li>' +
        '</ol>' +
        '<p>You can also show what you <em>don\'t</em> want: "Here is an update that was too formal. Avoid sounding like this."</p>' +
        '<p>Two cautions. Remove anything private from the example before you paste it. And the AI copies <em>everything</em> it sees, so if your example has a mistake, say so, or it will happily copy that too.</p>',
    },
    {
      kind: 'compare',
      title: 'Describing vs showing',
      before: { label: 'Describing', text: 'Write my weekly update. Make it short, warm and a bit funny.' },
      after: {
        label: 'Showing',
        text:
          'Here is last month\'s update my manager loved: [example]. Write this week\'s update in the same length and tone, ending with one question like it does. This week: sign-up is done, testing moved to Friday.',
      },
      notes: ['The example settles what "warm" means.', 'It says exactly what to copy.', 'New facts keep it from copying the old news.'],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before pasting a real example, remove names, numbers or anything private that the AI does not need.',
    },
    {
      kind: 'check',
      question: 'Why does an example often beat a description?',
      options: ['It is longer', 'Words like "warm" mean different things; an example means one thing', 'AI tools ignore descriptions'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is using examples to get the style right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ada wrote "make it a bit funny" and got forced jokes. What is the better move?',
        options: [
          { text: 'Write "make it MUCH funnier"', why: 'Louder words, same problem: "funny" means different things.' },
          { text: 'Paste an update she liked and say "match this tone"' },
          { text: 'Give up on tone', why: 'Tone is fixable with an example.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "show it" pattern in order.',
        lines: ['Paste the example', 'Say what to copy from it', 'Say what is different this time'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Describing or showing?',
        groups: ['Describing', 'Showing'],
        items: [
          { text: 'Make it sound professional', group: 0 },
          { text: 'Here is a message I liked: [example]. Match its tone.', group: 1 },
          { text: 'Be a bit more casual', group: 0 },
          { text: 'Write it like this subject line: "Quick win: sign-up is live"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'Here is an update my manager liked: [example]. Match the [[1]] and the [[2]], but use this week\'s [[3]].',
        blanks: [['length', 'tone'], ['tone', 'length'], ['facts', 'news']],
        distractors: ['typos', 'password'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Love your last newsletter intro! Could the next one sound like that too?',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Write a newsletter intro Lucía will like.', why: 'The AI has never seen what Lucía liked.' },
          { text: 'Copy last month\'s intro exactly.', why: 'Same style, yes; same words, no.' },
          { text: 'Here is last month\'s intro Lucía liked: [intro]. Write this month\'s in the same tone and length, about the new sign-up flow.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: "Show, don't ... (one word)",
        answers: ['describe', 'tell'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risk in this request.',
        lines: [
          'Here is an email I liked:',
          '"Hi Tunde, your salary review is on Friday, your new number is..."',
          'Write my update to Lucía in the same tone.',
        ],
        bug: 1,
        fix: '"Hi [name], quick update on Friday\'s review..."',
        explanation: 'The example contains private information the AI does not need. Remove it first.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Ada wants to the best example to paste.',
        pairs: [
          ['A friendly client update', 'An update a client replied warmly to'],
          ['A punchy subject line', 'A subject line that got opened'],
          ['A clear bug report', 'A bug report the developers praised'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada wants to avoid sounding stiff. Which request uses a "not like this" example?',
        options: [
          { text: 'Do not be stiff.', why: 'Stiff how? No example.' },
          {
            text: 'Here is an update that felt too stiff: [example]. Write mine about the testing delay, but avoid sounding like this. Friendly, plain words.',
          },
          { text: 'Be the opposite of boring.', why: 'Vague, and likely to over-correct.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Ada tells the AI to copy.',
        tiles: ['Match', 'its', 'length', 'and', 'tone'],
        distractors: ['typos', 'names'],
      },
    ],
  },
  reflect: {
    prompt: 'Which message of yours worked really well? How could you use it as an example for the AI?',
    starters: ['The message that worked was...', 'I would ask the AI to copy...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Save two or three of your best messages in a note. They are now your examples.',
  },
  notes: 'Few-shot / example prompting presented in plain words. No statistics.',
};

export default lesson;
