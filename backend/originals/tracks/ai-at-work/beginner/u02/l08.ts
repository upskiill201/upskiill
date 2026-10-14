import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 8 — the shape of a good "no": clear, kind, with an alternative. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Saying no politely',
  summary: 'A vague "maybe" causes more trouble than a clear, kind "no". Here is how to write one.',
  minutes: 13,
  outcomes: [
    'Use the five parts of a good "no"',
    'Choose between "no, but", "not now" and "yes, if"',
    'Avoid over-apologising and promises you cannot keep',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The extra request',
      beats: [
        { speaker: 'narrator', text: 'Wednesday. Ada is already full with the launch.' },
        { speaker: 'lucia', text: 'Ada, could your team also design a new banner for our website? By Friday? It would be amazing.' },
        { speaker: 'ada', text: "I can't. But Lucía is our biggest client. I can't just say no... can I?" },
        { speaker: 'tey', text: "You can. A clear no with an alternative protects the relationship better than a yes you can't deliver." },
        { speaker: 'narrator', text: "Ada asks the AI: \"Help me say no to Lucía's banner request for Friday. Reason: the launch needs the whole team. Offer: we can do it the week after. Warm, short, no over-apologising.\"" },
      ],
      choice: {
        prompt: 'Which version should Ada send?',
        options: [
          {
            text: '"I\'d love to, but the launch needs the whole team this week, so we can\'t do it by Friday. We could do it the week after: would that work?"',
            outcome: 'Lucía replies in five minutes: "Totally fair, next week is fine!" The banner gets done properly the following week.',
            best: true,
          },
          {
            text: '"So sorry!!! I\'m really, really sorry, we\'re so busy, I feel terrible, maybe we can try?"',
            outcome: 'Lucía reads "maybe we can try" as a yes. On Friday she asks where the banner is.',
          },
          {
            text: '"Sure, no problem!"',
            outcome: 'The team works late on Thursday and the banner has two mistakes. The launch suffers too.',
          },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'The five parts of a good no',
      html:
        '<ol>' +
        '<li><strong>Appreciation.</strong> "Thanks for thinking of us" or "I\'d love to".</li>' +
        '<li><strong>A clear no.</strong> "We can\'t do it by Friday." Not "it might be tricky".</li>' +
        '<li><strong>A short, true reason.</strong> One sentence. You do not owe an essay.</li>' +
        '<li><strong>An alternative.</strong> What you <em>can</em> do: later, smaller, or someone else.</li>' +
        '<li><strong>A warm close.</strong> A question that keeps things moving: "Would that work?"</li>' +
        '</ol>' +
        '<h3>Three kinds of no</h3>' +
        '<ul>' +
        '<li><strong>No, but:</strong> "We can\'t design it, but here is a template you could use."</li>' +
        '<li><strong>Not now:</strong> "Not this week; the week after works."</li>' +
        '<li><strong>Yes, if:</strong> "Yes, if we move the launch email to Monday." A conditional yes is still honest.</li>' +
        '</ul>' +
        '<p>Two traps: <strong>over-apologising</strong> (it sounds like guilt, and invites pushback) and <strong>"maybe"</strong> (it is heard as yes).</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Give the AI the real reason and your alternative. It will handle the warmth; you supply the truth.',
    },
    {
      kind: 'check',
      question: 'Why is "maybe we can try" risky?',
      options: ['It is too short', 'Most people hear it as yes', 'It is rude'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is learning to say no well.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five parts of a good no.',
        lines: ['Appreciation', 'A clear no', 'A short, true reason', 'An alternative', 'A warm close'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of no to an example.',
        pairs: [
          ['No, but', '"We can\'t design it, but here\'s a template"'],
          ['Not now', '"Not this week; the week after works"'],
          ['Yes, if', '"Yes, if the email moves to Monday"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear no, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: "We can't do it by Friday.", group: 0 },
          { text: 'It might be a bit tricky...', group: 1 },
          { text: 'Not this week, but next week works.', group: 0 },
          { text: "We'll see what we can do!", group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can a clear no protect a relationship better than a yes?',
        options: [
          { text: 'A yes you cannot deliver damages trust more than an honest no' },
          { text: 'People like hearing no', why: 'They do not, but they like broken promises even less.' },
          { text: 'It is shorter', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "not now" no.',
        tiles: ['Not', 'this', 'week,', 'but', 'next', 'week', 'works'],
        distractors: ['never', 'maybe'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the over-apology.',
        lines: [
          'Thanks so much for thinking of us!',
          "I'm so, so sorry, I feel awful, please forgive me, I really am sorry.",
          "We can't do the banner by Friday because of the launch.",
          'Could we do it the week after?',
        ],
        bug: 1,
        explanation: 'Too much apology sounds like guilt and invites pushback.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Could you join our 2-hour marketing workshop tomorrow? It'd be great to have you!",
        prompt: "Ada is fully booked tomorrow. Which reply is best?",
        options: [
          { text: "Thanks for the invite! I can't make tomorrow, it's launch prep. Could I send our design notes for the workshop instead?" },
          { text: "Maybe! I'll try!", why: 'Heard as yes. She cannot go.' },
          { text: 'No.', why: 'Clear, but cold, with no alternative.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request for the AI.',
        template: 'Help me say no to [[1]] request. Reason: [[2]]. Offer: [[3]]. Warm, short, no over-apologising.',
        blanks: [["Lucía's"], ['the launch needs the whole team'], ['the week after']],
        distractors: ['nobody', 'I feel like it'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Maybe" is usually heard as ... (one word)',
        answers: ['yes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the AI to write a good no?',
        options: [
          { text: 'Say no nicely.', why: 'No reason, no alternative: it will invent or stay vague.' },
          { text: "Say no to Grace's request to review her portfolio today. Reason: launch day. Offer: Thursday at 3. Friendly, 3 lines." },
          { text: 'Write the nicest possible yes.', why: 'Ada needs to say no.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of no is this?',
        groups: ['No, but', 'Not now', 'Yes, if'],
        items: [
          { text: "Not today, but Thursday works.", group: 1 },
          { text: "Yes, if we can push the deadline a day.", group: 2 },
          { text: "We can't build it, but this free tool could help.", group: 0 },
          { text: "Next month, once the launch is out.", group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Thanks for the honest no last week. Most agencies just say yes and then miss the deadline.',
        prompt: 'Which reply builds on that trust?',
        options: [
          { text: "Thank you! I'd rather tell you early than let you down late." },
          { text: "Sorry again for saying no!", why: 'No need to apologise again; it worked.' },
          { text: "We'll say yes to everything from now on.", why: 'That is exactly what she just said she dislikes.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good no includes an ... (what you CAN do instead)',
        answers: ['alternative', 'option', 'offer'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to the fix.',
        pairs: [
          ['Over-apologising', 'One short thanks, then the no'],
          ['"Maybe"', 'A clear yes or no'],
          ['A long excuse', 'One true sentence of reason'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What must Ada supply that the AI cannot?',
        options: [
          { text: 'The real reason and the real alternative' },
          { text: 'The warm wording', why: 'The AI is good at warmth. The truth must come from Ada.' },
          { text: 'The greeting', why: 'The AI can handle that.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you said "maybe" to recently that should have been a clear no? Write the no you could send.',
    starters: ['I said maybe to...', 'A better answer would be...'],
  },
  deepen: { title: 'Try it today', summary: 'Practise one "not now" this week, with a real alternative date.' },
  notes: 'Structure of declining requests is general communication guidance. Story is fictional.',
};

export default lesson;
