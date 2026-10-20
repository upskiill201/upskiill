import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: where power really comes from. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Where power really comes from',
  summary: 'Joel thinks power means being big. Grace sends the research: power in a negotiation comes mostly from your alternatives, and the feeling of power changes how people behave.',
  minutes: 12,
  outcomes: [
    'Name four sources of negotiation power',
    'See BATNA as the main one',
    'Know how feeling powerful changes behaviour',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four sources of power',
      html: '<p>In <em>Getting to Yes</em>, Fisher and Ury argue that the most important source of power is your <strong>BATNA</strong>: the better your alternative, the less you need this deal. Other sources matter too:</p><ul><li><strong>Alternatives (BATNA):</strong> what you\'ll do with no deal. Arjun\'s is unclear. That\'s why he feels small.</li><li><strong>Their need:</strong> how much they need what you offer. Harlow &amp; Finch needs a working app before spring, and their board has already seen Arjun\'s demo.</li><li><strong>Information:</strong> knowing what the other quotes really include, what launch delays cost, and who decides.</li><li><strong>Time:</strong> who is under more pressure to finish. Spring is closer for them than for him.</li></ul><p>Feeling powerful changes behaviour. Joe Magee, Adam Galinsky and Deborah Gruenfeld (2007) found that people primed to feel powerful were more likely to start a negotiation and to make the first offer, and first offers tend to help.</p><p>So the fix for feeling small isn\'t to act tough. It\'s to <strong>actually improve your alternative</strong>, then negotiate from there.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Power comes from alternatives, their need, information and time. Improve your BATNA, and you\'ll feel, and be, stronger.',
    },
  ],
  apply: {
    scenario: 'Four sources of power.',
    items: [
      {
        kind: 'mcq',
        prompt: 'According to Fisher and Ury, what is the main source of negotiation power?',
        options: [
          { text: 'Your BATNA: your best alternative to a deal' },
          { text: 'The size of your company', why: 'Size isn\'t the main source.' },
          { text: 'How loudly you speak', why: 'Alternatives matter most.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which source of power is this?',
        groups: ['Alternatives', 'Their need', 'Time'],
        items: [
          { text: 'Another client who\'d hire Arjun', group: 0 },
          { text: 'They need the app before spring', group: 1 },
          { text: 'Spring is closer for them than for him', group: 2 },
          { text: 'Their board has seen his demo', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to a question Arjun can ask.',
        pairs: [
          ['Alternatives', 'What will I do if I walk?'],
          ['Their need', 'What happens if they miss spring?'],
          ['Information', 'What do the other quotes include?'],
          ['Time', 'Who is under more pressure?'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'So should we act more powerful on the call?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Don\'t act. Get a real alternative this week. Then you\'ll be calmer without trying.' },
          { text: 'Yes, deepen your voice.', why: 'Acting tough isn\'t power.' },
          { text: 'Pretend you have ten offers.', why: 'Bluffs can be called.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Magee, Galinsky and Gruenfeld publish their power study?',
        answers: ['2007'],
        placeholder: 'A year',
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        template: 'Don\'t act tough. Actually [[1]] your [[2]].',
        blanks: [['improve'], ['alternative', 'BATNA']],
        distractors: ['hide', 'voice'],
      },
      {
        kind: 'mcq',
        prompt: 'What did people primed to feel powerful do more often?',
        options: [
          { text: 'Start negotiations and make first offers' },
          { text: 'Give in faster', why: 'The opposite.' },
          { text: 'Avoid negotiating', why: 'They negotiated more.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s power list is wrong?',
        lines: [
          'They need the app before spring.',
          'Their board has seen our demo.',
          'They\'re bigger, so they have all the power.',
          'Our BATNA needs work.',
        ],
        bug: 2,
        fix: 'Power depends on alternatives on both sides.',
        explanation: 'Size isn\'t the main source of power.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many sources of power does the lesson name?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build real power before Friday.',
        lines: ['List your sources of power', 'Improve your alternative', 'Gather information', 'Negotiate from there'],
      },
    ],
  },
  reflect: {
    prompt: 'For your negotiation, rate each source of power: alternatives, their need, information, time. Which can you improve this week?',
    starters: ['My strongest source is...', 'I can improve...'],
  },
  deepen: {
    title: 'Power and the first offer',
    summary: 'Because feeling powerful makes people more likely to go first, and first offers tend to anchor deals, a stronger BATNA helps twice: as a walk-away and as confidence.',
  },
  notes: 'Fisher, Ury & Patton, Getting to Yes, ch. 6 ("What if they are more powerful? Develop your BATNA"). Magee, Galinsky & Gruenfeld (2007), "Power, propensity to negotiate, and moving first in competitive interactions", Personality and Social Psychology Bulletin 33(2).',
};

export default lesson;
