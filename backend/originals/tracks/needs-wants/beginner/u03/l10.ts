import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the values plan. Cliffhanger: the car. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: spend like you mean it',
  summary: 'Lucía asks Ada to help Sofía, her quiet new hire in Mexico City, build a values map. Use everything from Chapter 3. Then Ngozi\'s cousin makes Ada an offer that sounds perfect: his car, ₦3.2 million, "pay small small".',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a values map for someone else', 'Use values, joy per naira and real vs assumed obligations together'],
  learn: [
    {
      kind: 'story',
      title: 'The offer',
      beats: [
        { speaker: 'narrator', text: 'A message from Lucía: "My newest hire, Sofía, just got her first salary. She\'s brilliant and quiet and already broke. Can you show her your values map? She\'ll listen to you."' },
        { speaker: 'ada', text: 'Me, the one who spent her whole raise on rides? Sure. Send her my way.' },
        { speaker: 'narrator', text: 'That weekend, Ngozi\'s cousin Emeka-Obi pulls up outside in a shiny silver car.' },
        { speaker: 'narrator', text: '"Ada! I\'m moving to Abuja. Take my car. ₦3.2 million, but for you, ₦150,000 a month for two years. No more buses in the rain!"' },
        { speaker: 'ada', text: 'No more buses... ever.' },
        { speaker: 'narrator', text: 'Ngozi, from the doorway, raising an eyebrow: "Ada. Do the maths first."' },
        { speaker: 'tey', text: 'That\'s Chapter 3: values, joy per naira, generous and ruthless, and real vs assumed obligations. But a car isn\'t a gym membership. It\'s a two-year decision. Chapter 4: hard choices. First, Sofía.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Sofía, Mexico City, first salary, already short. Her extra-money list: send money to her grandmother, a photography course, weekend trips with friends, new clothes for work, a better apartment.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each of Sofía\'s ideas to a value.',
        pairs: [
          ['Money for her grandmother', 'Family'],
          ['Photography course', 'Growth'],
          ['Weekend trips with friends', 'Connection'],
          ['A better apartment', 'Comfort and security'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sofía\'s spending: serves a value, or no value?',
        groups: ['Serves a value', 'No value'],
        items: [
          { text: 'Monthly transfer to her grandmother', group: 0 },
          { text: 'Three delivery apps she uses out of boredom', group: 1 },
          { text: 'Photography club', group: 0 },
          { text: 'Expensive coffee she doesn\'t enjoy, out of habit', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Sofía feels guilty spending on the photography club. What should Ada tell her?',
        options: [
          { text: 'Cut it, it\'s selfish', why: 'Spending on growth isn\'t selfish.' },
          { text: 'Spend unlimited on it', why: 'Generous still has a size.' },
          { text: 'If growth is a top value, give it a size and keep it, guilt-free' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sofía\'s habit coffee: 400 pesos a week, scored 2. About how much a month (4 weeks)?',
        answers: ['1600', '1,600', '1600 pesos'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Everyone on the team goes to a fancy brunch every Sunday. I feel I have to.',
        prompt: 'Ada\'s best reply?',
        options: [
          { text: 'Go every week, to fit in.', why: 'An assumed expectation, every week.' },
          { text: 'Ask: who would actually notice, and would they mind? Go when it matters to you, and say a warm "not this week" when it doesn\'t.' },
          { text: 'Never go.', why: 'Connection may be one of her values.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Values-based spending.',
        template: '[[1]] where it matters, [[2]] where it doesn\'t.',
        blanks: [['Generous'], ['ruthless']],
        distractors: ['Cheap', 'lazy'],
      },
      {
        kind: 'findBug',
        prompt: 'Sofía\'s draft plan. Which line goes against her values?',
        lines: [
          'Keep the transfer to my grandmother.',
          'Keep the photography club.',
          'Cut the photography club to afford three delivery apps.',
        ],
        bug: 2,
        fix: 'Cut the delivery apps; keep the club.',
        explanation: 'That moves money from a top value to no value at all.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada helps Sofía.',
        lines: ['List what she\'d do with extra money', 'Find her values', 'Tag her spending', 'Score joy per peso', 'Cut the untagged, protect the top'],
      },
      {
        kind: 'mcq',
        prompt: 'The car: ₦150,000 a month for 24 months. Before anything else, what should Ada do?',
        options: [
          { text: 'Do the maths: the total, and all the running costs' },
          { text: 'Say yes, it\'s a good deal', why: 'She hasn\'t checked anything.' },
          { text: 'Say no without thinking', why: 'It deserves a proper decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '₦150,000 a month for 24 months. What\'s the total?',
        answers: ['3600000', '3,600,000', '₦3,600,000', '₦3600000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The cash price is ₦3.2 million. How much more is the payment plan?',
        options: [
          { text: 'The same', why: '3.6 million vs 3.2 million.' },
          { text: '₦400,000 more' },
          { text: '₦3.6 million more', why: 'That\'s the total, not the extra.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'If Ada took the car, what would happen to the Mexico plan?',
        options: [
          { text: 'Nothing', why: 'It\'s ₦150,000 every month.' },
          { text: 'It would get easier', why: 'It would get impossible.' },
          { text: '₦150,000 a month would go on the car, more than her whole Mexico saving' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What big purchase are you tempted by right now? What\'s its total cost, not just the monthly price?',
    starters: ['I\'m tempted by...', 'The total would be...'],
  },
  notes: 'Chapter 3 challenge. Sofía (Leadership track course-only cast: newest hire on Lucía\'s team at Nopal; speaker id sofia). Pesos for Sofía\'s numbers. Emeka-Obi: Ngozi\'s cousin (narrated; distinct from Synergix\'s Emeka). Car (fictional): cash ₦3.2M or ₦150,000 × 24 = ₦3.6M. Leads to Ch4 hard choices.',
};

export default lesson;
