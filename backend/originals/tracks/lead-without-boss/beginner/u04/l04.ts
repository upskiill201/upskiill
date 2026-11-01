import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Myth or Fact: speaking up to senior people (Milliken et al. 2003; Detert & Edmondson 2011; Detert & Burris 2007). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Disagreeing upwards',
  summary: 'In the exception meeting, the Head of IT suggests a fix: "Just tell customers refunds take 10 days. Problem solved." Remi thinks that\'s wrong. He\'s the most junior person in the room by about fifteen years. Myth or fact, before he opens his mouth.',
  minutes: 11,
  outcomes: [
    'Know how common it is to stay quiet with senior people',
    'Know why the fear is often bigger than the risk',
    'Disagree upwards respectfully and clearly',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Most people speak up when they see a problem at work.', isFact: false, explain: 'Myth. In a study by Frances Milliken, Elizabeth Morrison and Patricia Hewlin (2003), 85% of the employees they interviewed said that at least once they had felt unable to raise an issue or concern with their bosses, even when they thought it mattered.' },
        { text: 'People often hold unwritten rules about when speaking up is "safe", which make them quieter than they need to be.', isFact: true, explain: 'Fact. James Detert and Amy Edmondson (2011) found many people hold "implicit voice theories", like "don\'t embarrass the boss in public" or "you need solid data before you speak". These rules often make people more silent than the real risk would justify.' },
        { text: 'How open the senior person is affects whether others speak up.', isFact: true, explain: 'Fact. Research by James Detert and Ethan Burris (2007) linked leaders\' openness to more employee voice. You can\'t control their openness, but you can make it easier for them to listen.' },
        { text: 'Disagreeing with a senior person means telling them they\'re wrong.', isFact: false, explain: 'Myth. You can disagree with an idea while respecting the person: "Can I offer a concern?" Then the reason, then an alternative. That\'s very different from "you\'re wrong".' },
        { text: 'Framing your concern around a goal they care about makes it easier to hear.', isFact: true, explain: 'Fact, broadly. Concerns linked to shared goals (keeping a big customer, avoiding risk) tend to land better than concerns that sound personal. It\'s Chapter 2\'s "your goal" lesson, pointed upwards.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Most people stay quiet more than they need to. Ask permission, give the reason, offer an alternative, link it to their goal. Disagree with the idea, respect the person.',
    },
  ],
  apply: {
    scenario: 'The exception meeting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In Milliken and colleagues\' study, how many people had at least once felt unable to raise a concern?',
        options: [
          { text: '5%', why: 'Far more than that.' },
          { text: '85%' },
          { text: '100%', why: 'High, but not everyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Most people always speak up', group: 0 },
          { text: 'Unwritten rules keep people quiet', group: 1 },
          { text: 'Disagreeing means saying "you\'re wrong"', group: 0 },
          { text: 'Leader openness affects voice', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"Just tell customers refunds take 10 days. Problem solved."',
        prompt: 'Remi\'s best response to the Head of IT?',
        options: [
          { text: 'That\'s a terrible idea.', why: 'Disagrees with the person, not just the idea.' },
          { text: '(Stays silent and nods.)', why: 'The 85%. And the goal quietly dies.' },
          { text: 'Can I offer a concern? Mama Mboga told us 21 days might make them leave. 10 may not keep them. Could one Saturday change get us to five?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Detert and Edmondson called the unwritten rules "implicit ___ theories". (one word)',
        answers: ['voice', 'Voice'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the finding.',
        pairs: [
          ['Milliken, Morrison and Hewlin', '85% stayed quiet at least once'],
          ['Detert and Edmondson', 'Implicit voice theories'],
          ['Detert and Burris', 'Leader openness and voice'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why link the concern to keeping Mama Mboga?',
        options: [
          { text: 'It connects to a goal the senior person cares about, so it\'s easier to hear' },
          { text: 'To guilt-trip him', why: 'It\'s a shared goal, not guilt.' },
          { text: 'Because it\'s Remi\'s favourite customer', why: 'It\'s the company\'s biggest one.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s planned response. Which line makes it personal?',
        lines: [
          'Can I offer a concern?',
          'With respect, you clearly don\'t understand customers.',
          'Could one Saturday change get us to five?',
        ],
        bug: 1,
        fix: 'Mama Mboga told us long waits might make them leave.',
        explanation: '"You don\'t understand" attacks the person. Give the reason instead.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put disagreeing upwards in order.',
        lines: ['Ask permission', 'Give the reason', 'Link it to their goal', 'Offer an alternative'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Disagree with the [[1]], respect the [[2]].',
        blanks: [['idea'], ['person']],
        distractors: ['boss', 'title'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s opener.',
        tiles: ['Can', 'I', 'offer', 'a', 'concern?'],
        distractors: ['complaint?'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last stay quiet with someone senior when you disagreed? Which unwritten rule were you following? What would you say now?',
    starters: ['I stayed quiet when...', 'The rule in my head was...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'One concern, offered',
    summary: 'Next time you disagree with someone senior, try: "Can I offer a concern?" Then one reason and one alternative. That\'s all.',
  },
  notes: 'Frances J. Milliken, Elizabeth W. Morrison & Patricia F. Hewlin (2003), "An Exploratory Study of Employee Silence", J. Management Studies 40(6): 85% of 40 interviewees. James R. Detert & Amy C. Edmondson (2011), "Implicit Voice Theories", Academy of Management Journal 54(3). James R. Detert & Ethan R. Burris (2007), "Leadership Behavior and Employee Voice: Is the Door Really Open?", AMJ 50(4). Issue-selling framing: Dutton & Ashford (1993), hedged as "broadly".',
};

export default lesson;
