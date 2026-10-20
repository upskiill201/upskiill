import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Reading: emotions at the table. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Emotions at the table',
  summary: 'Kavya wants to "show them we\'re angry". Joel wants to hide every feeling. Grace sends them two pieces of research: one on anger, one on putting feelings into words.',
  minutes: 12,
  outcomes: [
    'Know what research says about anger in negotiation',
    'Use naming to calm your own and others\' feelings',
    'Choose honesty over performance',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Anger, fake anger, and naming it',
      html: '<p><strong>Anger can work, briefly.</strong> Gerben van Kleef and colleagues (2004) found that negotiators facing an angry opponent sometimes conceded more in one-off deals. But anger also made people less willing to work together again, and Arjun wants a long relationship with Harlow &amp; Finch.</p><p><strong>Fake anger backfires.</strong> Stéphane Côté, Ivona Hideg and Van Kleef (2013) found that people who <em>faked</em> anger were trusted less, and their opponents asked for more, not less. Acting angry to "show them" tends to fail.</p><p><strong>Naming a feeling calms it.</strong> Matthew Lieberman\'s team (2007) found that putting a feeling into words ("this is anger") reduced activity in the brain\'s alarm system, the amygdala. That works for you, and for the other side: <em>"It sounds like you\'re under a lot of pressure on this budget."</em></p><p>The lesson: don\'t perform emotions and don\'t bury them. Notice them, name them, and keep them from writing your emails.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Don\'t fake anger and don\'t bury feelings. Name them, yours and theirs, so they calm down.',
    },
  ],
  apply: {
    scenario: 'Emotions at the table.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened when people faked anger in Côté and colleagues\' research?',
        options: [
          { text: 'They were trusted less, and the other side asked for more' },
          { text: 'They got bigger concessions', why: 'Faked anger backfired.' },
          { text: 'Nothing changed', why: 'It made things worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps or hurts in a long relationship?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Naming the pressure he\'s under', group: 0 },
          { text: 'Acting furious to scare him', group: 1 },
          { text: '"I\'m concerned this won\'t cover the work."', group: 0 },
          { text: 'A sarcastic reply', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which part of the brain calmed down when people named their feelings? (one word)',
        answers: ['amygdala', 'the amygdala'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researchers.',
        pairs: [
          ['Anger can win concessions in one-off deals', 'Van Kleef and colleagues (2004)'],
          ['Fake anger backfires', 'Côté, Hideg and Van Kleef (2013)'],
          ['Naming feelings calms the alarm', 'Lieberman and colleagues (2007)'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Let\'s act really angry on the call so he backs down.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Faked anger tends to backfire, and you want to work with them for years. Be calm and clear about what doesn\'t work.' },
          { text: 'Yes, shout a bit.', why: 'It damages trust.' },
          { text: 'Pretend you\'re happy with £28,000.', why: 'Be honest, not fake either way.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Naming theirs.',
        template: '"It sounds like you\'re under a lot of [[1]] on this [[2]]."',
        blanks: [['pressure'], ['budget']],
        distractors: ['fun', 'holiday'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might real anger still hurt Arjun here?',
        options: [
          { text: 'It makes the other side less willing to work together again' },
          { text: 'It\'s against UK law', why: 'It\'s about the relationship.' },
          { text: 'It doesn\'t', why: 'Research links anger to weaker relationships.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the call plan performs an emotion?',
        lines: [
          'Thank him for his time.',
          'Say calmly that £28,000 doesn\'t cover the work.',
          'Sigh loudly and say "This is so disappointing."',
          'Ask what matters most to them.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A performed sigh is fake emotion.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the fake-anger study published?',
        answers: ['2013'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a strong feeling in a negotiation.',
        lines: ['Notice it', 'Name it to yourself', 'Decide what to say', 'Say it calmly'],
      },
    ],
  },
  reflect: {
    prompt: 'What feeling usually takes over when a negotiation gets hard for you? What would naming it out loud sound like?',
    starters: ['Usually I feel...', 'I could say...'],
  },
  deepen: {
    title: 'Emotional honesty',
    summary: 'Saying "I\'m concerned" or "I\'m frustrated by this number" honestly and calmly is different from acting angry. It tells the other side where you stand without starting a fight.',
  },
  notes: 'Van Kleef, De Dreu & Manstead (2004), JPSP 86(1); Côté, Hideg & Van Kleef (2013), "The consequences of faking anger in negotiations", Journal of Experimental Social Psychology 49(3); Lieberman et al. (2007), "Putting feelings into words", Psychological Science 18(5).',
};

export default lesson;
