import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12. Chat with Tey: disagreeing in a meeting without starting a war — Zanele vs Emeka. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Disagreeing without starting a war',
  summary: 'Zanele and Emeka disagree about couriers. Zanele says "With all due respect, that\'s ridiculous." The temperature in the room drops ten degrees. There\'s a better way.',
  minutes: 12,
  outcomes: [
    'Disagree clearly and kindly in a meeting',
    'Decode "devil\'s advocate", "with all due respect" and "I see it differently"',
    'Disagree with the idea, never the person',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Thursday, 11:30. Emeka wants to switch every delivery to a new courier, starting Monday. Zanele thinks that's too fast. She says: \"With all due respect, Emeka, that's ridiculous.\" What happened to the room?",
          replies: ['It got very quiet.', 'Was "with all due respect" not polite?'],
        },
        {
          tey: "Here's the funny thing about \"with all due respect\": it SOUNDS polite, but people usually say it right before something rude. So most listeners hear it as a warning. Add \"ridiculous\", and Emeka feels attacked, not disagreed with.",
          replies: ['So what should she have said?'],
        },
        {
          tey: "The golden rule: disagree with the IDEA, not the PERSON. Try: \"I see it a bit differently. Switching everything on Monday feels risky to me, because we haven't tested the new courier. Could we try it on one route first?\"",
          replies: ['Why is that better?'],
        },
        {
          tey: "Three reasons. \"I see it differently\" is honest but calm. \"Because...\" gives a reason, so it's about facts, not feelings. And it ends with a suggestion, so Emeka has somewhere to go besides \"no\".",
          replies: ['What\'s "playing devil\'s advocate"?'],
        },
        {
          tey: "Good one. It means arguing the other side on purpose, to test an idea, even if you don't believe it: \"Just to play devil's advocate: what if the new courier is late too?\" It's a safe way to raise a worry without owning a fight.",
          replies: ['Any other safe phrases?'],
        },
        {
          tey: "Plenty: \"I wonder if...\", \"Have we considered...?\", \"I'm not sure I agree, because...\", \"What would happen if...?\" Use them, and you can disagree with a CEO and still be invited back.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Disagree with the idea, not the person. Give a reason. Offer another way.',
    },
  ],
  apply: {
    scenario: 'Thursday, 11:30. Couriers: switch now, or test first?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "With all due respect, that\'s ridiculous" go badly?',
        options: [
          { text: 'It attacked Emeka\'s idea as silly, and the opener sounded like a warning' },
          { text: 'Disagreeing at work is never allowed', why: 'Disagreeing is healthy. The wording was the problem.' },
          { text: 'Zanele said it too quietly', why: 'Volume wasn\'t the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm disagreement, or starting a war?',
        groups: ['Calm disagreement', 'Starting a war'],
        items: [
          { text: 'I see it a bit differently...', group: 0 },
          { text: 'That\'s ridiculous.', group: 1 },
          { text: 'Have we considered testing it first?', group: 0 },
          { text: 'You obviously haven\'t thought about this.', group: 1 },
          { text: 'I\'m not sure I agree, because...', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what it really does.',
        pairs: [
          ['Playing devil\'s advocate', 'Arguing the other side on purpose'],
          ['With all due respect', 'Often warns that something rude is coming'],
          ['I see it differently', 'Calm, honest disagreement'],
          ['Have we considered...?', 'Suggests another option'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, what do you think? Switch everything Monday, or not?',
        prompt: 'Remi thinks it\'s too fast. Best answer?',
        options: [
          { text: 'Whatever you think, Brian.', why: 'He asked for Remi\'s view. Give it.' },
          { text: 'Emeka\'s plan is wrong.', why: 'It attacks the plan and gives no reason.' },
          { text: 'I see the benefit, but I\'d test it on one route first, because we haven\'t seen how the new courier performs.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rewrite Zanele\'s line.',
        template: 'I see it a bit [[1]]. Switching everything feels risky, [[2]] we haven\'t tested it. Could we [[3]] one route first?',
        blanks: [['differently'], ['because'], ['try', 'test']],
        distractors: ['ridiculous', 'respect'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Just to play ___ advocate: what if the new courier is late too?" (one word)',
        answers: ['devil\'s', 'devils', 'devil'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s second try. Which sentence still attacks the person?',
        lines: [
          'I\'m not sure I agree.',
          'You always rush things, Emeka.',
          'Could we test it on the Mombasa route first?',
        ],
        bug: 1,
        fix: 'Switching everything at once feels risky to me.',
        explanation: '"You always..." is about Emeka. Talk about the plan instead.',
      },
      {
        kind: 'mcq',
        prompt: 'Emeka disagrees with REMI\'s suggestion. What\'s the best response?',
        options: [
          { text: 'Go quiet and sulk', why: 'Being disagreed with is normal. It\'s not personal.' },
          { text: '"That\'s fair. What would make you comfortable with a test first?"' },
          { text: '"With all due respect..."', why: 'We know where that goes.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['On board', 'Supporting it'],
          ['Sorry to jump in', 'Polite interruption'],
          ['Parking lot', 'Topics for another meeting'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a safe way to raise a worry.',
        tiles: ['What', 'would', 'happen', 'if', 'the', 'new', 'courier', 'is', 'late?'],
        distractors: ['ridiculous'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a disagreement you had recently. Rewrite what you said (or wanted to say) using "I see it differently", a reason, and a suggestion.',
    starters: ['What I said was...', 'Now I\'d say: "I see it differently..."'],
  },
  deepen: {
    title: 'The 3-part disagreement',
    summary: 'Next time you disagree at work, school or home, try: "I see it differently" + "because..." + "could we...?" Notice how differently people react.',
  },
  notes: '"Devil\'s advocate" (Merriam-Webster: one who champions the less accepted cause for the sake of argument), "with all due respect" (Cambridge notes it is often used before criticism/disagreement). Directness norms vary by culture; lesson keeps the advice broadly applicable.',
};

export default lesson;
