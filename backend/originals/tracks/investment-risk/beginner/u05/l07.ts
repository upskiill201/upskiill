import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Chat with Tey: saying no to family and friends. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Saying no to people you love',
  summary: 'Amma calls: her friend from the temple has a "very safe" scheme and wants Arjun to join, with Appa\'s pension too. How do you say no without hurting anyone? Tey talks him through it.',
  minutes: 12,
  outcomes: [
    'Say no to an investment pitch from someone you love',
    'Ask checking questions without insulting anyone',
    'Protect older relatives kindly',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Pitches from family are the hardest, because saying no can feel like saying "I don\'t trust you". Want a gentle way through?', replies: ['Please.'] },
        { tey: 'Separate the person from the offer. "I trust Aunty completely. I just check every investment the same way, even mine."', replies: ['Then what?'] },
        { tey: 'Ask the checking questions out loud, kindly: "Is it on SEBI\'s list? Where do the returns come from? Can I get my money out anytime? Is there a bonus for bringing people?" Often the answers do the convincing for you.', replies: ['What if they push?'] },
        { tey: 'Use a rule, not an argument: "I have a rule: no investment I can\'t check on the regulator\'s site, and nothing with guaranteed returns." Rules are harder to argue with than opinions.', replies: ['And Appa\'s pension?'] },
        { tey: 'Gently protect it. Offer to help Amma and Appa check any offer before they decide, and agree a family rule: big money decisions wait 24 hours and get a second opinion. Scammers often target retirees.', replies: ['What if Aunty\'s already invested?'] },
        { tey: 'Then she may be a victim too, not a villain. Be kind. If it collapses, she\'ll need support, not blame.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Separate the person from the offer. Ask the checking questions kindly. Use a rule, not an argument. Agree a family 24-hour, second-opinion rule for big decisions.',
    },
  ],
  apply: {
    scenario: 'Amma\'s call.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s approach.',
        lines: ['Separate the person from the offer', 'Ask the checking questions kindly', 'Use a rule, not an argument', 'Agree a family rule for big decisions'],
      },
      {
        kind: 'mcq',
        prompt: 'Why separate the person from the offer?',
        options: [
          { text: 'So saying no to the offer isn\'t saying no to them' },
          { text: 'To avoid them forever', why: 'It\'s about keeping the relationship.' },
          { text: 'It doesn\'t matter', why: 'It keeps it kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Amma says I\'m insulting Aunty by asking questions.',
        prompt: 'What could Arjun say?',
        options: [
          { text: 'Aunty is a scammer.', why: 'She may be a victim too.' },
          { text: 'Fine, put Appa\'s pension in.', why: 'Without checks, it\'s a big risk.' },
          { text: 'Amma, I ask these questions about everything, even my own money. It\'s not about Aunty. It\'s my rule.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind and protective, or harmful?',
        groups: ['Kind and protective', 'Harmful'],
        items: [
          { text: '"I check every investment the same way"', group: 0 },
          { text: '"Your friend is a criminal"', group: 1 },
          { text: 'A family 24-hour rule', group: 0 },
          { text: 'Investing to avoid an argument', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tactic.',
        template: 'Use a [[1]], not an [[2]].',
        blanks: [['rule'], ['argument']],
        distractors: ['tip', 'apology'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it checks.',
        pairs: [
          ['"Is it on SEBI\'s list?"', 'Regulation'],
          ['"Where do returns come from?"', 'Whether it\'s real'],
          ['"Can I get my money out anytime?"', 'Liquidity'],
          ['"Is there a bonus for bringing people?"', 'Ponzi sign'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the family rule is weak?',
        lines: [
          'Big money decisions wait 24 hours.',
          'Get a second opinion first.',
          'Unless the friend is from the temple, then it\'s fine.',
        ],
        bug: 2,
        fix: 'The rule applies to everyone.',
        explanation: 'Schemes spread through exactly these trusted circles.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are retirees often targeted?',
        options: [
          { text: 'They\'re greedy', why: 'It\'s about savings and trust.' },
          { text: 'They may have savings or pensions and trust their community' },
          { text: 'They aren\'t', why: 'They\'re frequent targets.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'If Aunty has already invested, how should Arjun think of her?',
        options: [
          { text: 'Possibly a victim, who may need support' },
          { text: 'A villain', why: 'She may have been fooled too.' },
          { text: 'A genius', why: 'She may lose her money.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours should big family money decisions wait?',
        answers: ['24', 'twenty-four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What family rule for money decisions could you suggest at home?',
    starters: ['Our rule could be...'],
  },
  deepen: {
    title: 'Affinity fraud',
    summary: 'Scams that spread through religious, ethnic or community groups are called affinity fraud. They work because members trust each other. The protection is a rule everyone follows, whoever is asking.',
  },
  notes: 'Affinity fraud: standard term (US SEC investor alerts). Amma, Aunty narrated.',
};

export default lesson;
