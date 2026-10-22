import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the space between. Cliffhanger: the aso-ebi message. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the space between',
  summary: 'Ngozi asks Ada to help her younger brother Tunde, just starting his first job, sort his needs from his wants. Use everything from Chapter 2. Then a message lands in the family WhatsApp: cousin Chiamaka\'s wedding, and the aso-ebi costs ₦85,000.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Sort a new earner\'s spending into needs, versions and wants', 'Use the cutting order, four questions and quick check together'],
  learn: [
    {
      kind: 'story',
      title: 'The family WhatsApp',
      beats: [
        { speaker: 'narrator', text: 'Ngozi\'s brother Tunde has started his first job: ₦250,000 a month, and already broke by the 20th. "Ada, you\'re the needs-and-wants expert now. Help him?"' },
        { speaker: 'ada', text: 'Me? Two weeks ago I was taking rides to the corner shop. But fine. Show me his month.' },
        { speaker: 'narrator', text: 'That night, Ada\'s family WhatsApp lights up. Her aunt: "Chiamaka\'s wedding is in eight weeks! Aso-ebi is ₦85,000, gele included. Everyone is buying. Send payment by Friday."' },
        { speaker: 'narrator', text: 'Thirty-one messages in ten minutes. Heart emojis. Photos of the fabric. Her mum: "Ada, you\'re buying, abi?"' },
        { speaker: 'ada', text: '₦85,000. That\'s more than a month of my Mexico saving.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: cutting in the right order, the four questions, the big three, need-now vs need-later, and the quick check. But aso-ebi isn\'t a gym membership. It\'s family. Chapter 3: what Ada really values. First, Tunde.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Tunde, first job, ₦250,000 a month, broke by the 20th.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Tunde\'s spending: must-have, nice-to-have, or want?',
        groups: ['Must-have', 'Nice-to-have', 'Want'],
        items: [
          { text: 'Transport to work', group: 0 },
          { text: 'Rides on dry mornings', group: 1 },
          { text: 'Three streaming apps', group: 2 },
          { text: 'Food', group: 0 },
          { text: 'Betting app top-ups "for fun"', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tunde\'s cuts.',
        lines: ['Things that give nothing (unused apps)', 'Things he barely notices', 'Things he likes a bit', 'Protect what he loves (his football)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tunde cancels two of three streaming apps at ₦4,000 each. Monthly saving?',
        answers: ['8000', '8,000', '₦8,000', '₦8000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Tunde says "I need rides, I can\'t do the bus." What\'s the best next step?',
        options: [
          { text: 'Agree: rides are a need', why: 'Only some rides are.' },
          { text: 'Ban rides forever', why: 'Late nights and safety still count.' },
          { text: 'Run the four questions: when does he truly need a ride?' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Tunde says the betting app is "just for fun, small small". What should I say?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'It\'s fine, it\'s fun.', why: 'Betting can become a serious problem quickly.' },
          { text: 'Ask how much went in this month, honestly. If it\'s more than he expected, or he chases losses, suggest he stops and talks to someone. It\'s not a normal want.' },
          { text: 'Lecture him for an hour.', why: 'A calm question works better.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Tunde\'s needs to its basic version.',
        pairs: [
          ['Food', 'Cooking with housemates'],
          ['Getting to work', 'Bus on dry mornings'],
          ['A phone', 'The one he has'],
          ['Fun', 'Football with friends on Saturdays'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The quick check, for Tunde.',
        template: 'Do I already [[1]] one? Would I pay [[2]] price today? Is it on my [[3]]?',
        blanks: [['have'], ['full'], ['plan']],
        distractors: ['want', 'sale'],
      },
      {
        kind: 'findBug',
        prompt: 'Tunde\'s plan. Which line will backfire?',
        lines: [
          'Cancel two unused streaming apps.',
          'Bus on dry mornings.',
          'Stop playing football with friends to save the ₦2,000 pitch fee.',
        ],
        bug: 2,
        fix: 'Keep football; it\'s what he loves.',
        explanation: 'Cutting the joy first makes the plan feel like punishment.',
      },
      {
        kind: 'mcq',
        prompt: 'Tunde\'s phone is slow but works. New one: ₦300,000. What does Chapter 2 say?',
        options: [
          { text: 'Need now: buy it', why: 'It still works.' },
          { text: 'Never replace it', why: 'Eventually he will.' },
          { text: 'Need later: a cheap fix now, and a sinking fund' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'The aso-ebi costs ₦85,000. Why is it harder to decide than the gym was?',
        options: [
          { text: 'It\'s tied to family, belonging and respect, not just money' },
          { text: 'It\'s more expensive', why: 'Price is part of it, but family is the hard part.' },
          { text: 'It isn\'t harder', why: 'Family expectations make it much harder.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada saves ₦85,000 a month. The aso-ebi is ₦85,000. How many months of her saving is that?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 2 tools: which fit the aso-ebi question?',
        groups: ['Helps', 'Doesn\'t fit'],
        items: [
          { text: 'Ask what she really values (next chapter)', group: 0 },
          { text: 'Look for the basic version', group: 0 },
          { text: 'Cancel it like a subscription', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a family or community expense you feel you can\'t say no to? What makes it hard?',
    starters: ['The expense:...', 'It\'s hard because...'],
  },
  notes: 'Chapter 2 challenge. Tunde (Ngozi\'s brother, narrated; not Ada\'s office ajo member Tunde — different person, same common name, no speaker id). Betting flagged as not a normal want (playbook §9: signpost, no gambling content beyond a warning). Aso-ebi: matching fabric worn by family/friends at Nigerian weddings; ₦85,000 incl. gele (fictional). Cliffhanger leads to Ch3 values.',
};

export default lesson;
