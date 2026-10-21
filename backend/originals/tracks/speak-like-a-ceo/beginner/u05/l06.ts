import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: they can't see it. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'They can\'t see it',
  summary: 'Two nights before, Lucía is sure 300 people will see her hands shake. Sofía sends two studies about how visible nerves really are.',
  minutes: 12,
  outcomes: [
    'Know the illusion of transparency',
    'Know the spotlight effect',
    'Use both to calm pre-talk worry',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Less visible than you think',
      html: '<p><strong>The illusion of transparency.</strong> Kenneth Savitsky and Thomas Gilovich (2003) found that people giving a speech believed their nervousness was much more obvious than it was. Audiences noticed far less.</p><p>Then the useful part: speakers who were <em>told</em> about this illusion before speaking felt less nervous, and their speeches were rated as better, by both themselves and observers.</p><p><strong>The spotlight effect.</strong> In a study by Gilovich, Medvec and Savitsky (2000), students had to wear an embarrassing T-shirt into a room of peers. They guessed about half the room would notice. In fact, only about a quarter did.</p><p>Put together: people are thinking about themselves much more than about you. Your racing heart, a small stumble, a shaky hand: most of the room won\'t notice, and those who do will forget it by lunch.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your nerves are less visible than they feel. Just knowing that can help you speak better.',
    },
  ],
  apply: {
    scenario: 'They can\'t see it.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Savitsky and Gilovich publish their study on speech nerves?',
        answers: ['2003'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'What happened to speakers who were told about the illusion?',
        options: [
          { text: 'They felt less nervous and their speeches were rated better' },
          { text: 'They felt more nervous', why: 'They felt less nervous.' },
          { text: 'Nothing changed', why: 'Both feeling and ratings improved.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Illusion of transparency or spotlight effect?',
        groups: ['Illusion of transparency', 'Spotlight effect'],
        items: [
          { text: 'Thinking your nerves are obvious', group: 0 },
          { text: 'Thinking everyone notices your T-shirt', group: 1 },
          { text: 'Believing they can see your racing heart', group: 0 },
          { text: 'Overestimating how much people notice you', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the study to its finding.',
        pairs: [
          ['Savitsky and Gilovich (2003)', 'Nerves less visible than felt'],
          ['Gilovich, Medvec and Savitsky (2000)', 'Fewer people notice than we think'],
          ['Brooks (2014)', '"I am excited" helps'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But my hands really do shake.',
        prompt: "Sofía\'s best reply?",
        options: [
          { text: 'Maybe a little. From row three, almost nobody will see it, and anyone who does will forget by lunch.' },
          { text: 'Everyone will notice.', why: 'Far fewer than you think.' },
          { text: 'Hide your hands behind your back.', why: 'They\'re less visible than you think.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Your nerves are less [[1]] than they [[2]].',
        blanks: [['visible'], ['feel']],
        distractors: ['real', 'cost'],
      },
      {
        kind: 'mcq',
        prompt: 'In the T-shirt study, about what share of the room actually noticed?',
        options: [
          { text: 'About a quarter' },
          { text: 'About half', why: 'That was the guess.' },
          { text: 'Everyone', why: 'About a quarter.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Lucía\'s worries does the research most clearly ease?',
        lines: [
          'I need to know my first line.',
          'I should rehearse once more.',
          'Everyone will see how nervous I am.',
          'I need water on stage.',
        ],
        bug: 2,
        fix: 'Most people won\'t notice my nerves.',
        explanation: 'That\'s the illusion of transparency.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s pre-talk thoughts.',
        lines: ['"My heart is racing."', '"I am excited."', '"They can\'t see it as much as I feel it."', 'First line'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the T-shirt study published?',
        answers: ['2000'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'Remember a time you felt sure everyone noticed something. Did they? How do you know?',
    starters: ['I was sure...', 'Actually...'],
  },
  deepen: {
    title: 'Knowing helps',
    summary: 'The striking part of the 2003 study is that simply knowing about the illusion made speeches better. You\'ve now read it, which means it may already be working.',
  },
  notes: 'Savitsky & Gilovich (2003), Journal of Experimental Social Psychology, "The illusion of transparency and the alleviation of speech anxiety". Gilovich, Medvec & Savitsky (2000), JPSP, "The spotlight effect": T-shirt wearers estimated ~50% noticed; ~23-25% did.',
};

export default lesson;
