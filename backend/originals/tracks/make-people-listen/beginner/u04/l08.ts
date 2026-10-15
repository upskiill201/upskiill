import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. "Myth or Mic Drop": firm isn't rude (Ames & Flynn 2007, curvilinear assertiveness). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or Mic Drop: firm isn\'t rude',
  summary: 'Lucía is worried. "If I hold the floor and set rules, won\'t everyone think I\'m bossy? Diego\'s so likeable. I don\'t want to be the bad guy." Tey: "Producer, cue Myth or Mic Drop."',
  minutes: 11,
  outcomes: [
    'Know what research suggests about too little and too much assertiveness',
    'Tell firm from harsh',
    'Hold your ground and stay warm',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'The nicest leaders never push back or set rules.', isFact: false, explain: 'Myth. In research by Ames and Flynn (2007), people rated leaders who were too unassertive as less effective. They got less done, and teams noticed.' },
        { text: 'Being very forceful is the best way to be respected.', isFact: false, explain: 'Myth. The same research found that too MUCH assertiveness also hurt: it damaged relationships. The best ratings tended to go to people in the middle.' },
        { text: 'You can be firm and warm at the same time.', isFact: true, explain: 'Mic drop. "Hold that thought, Diego, I\'ll come to you" is firm (you keep the floor) and warm (you promise him a turn).' },
        { text: 'Setting a meeting rule for everyone is rude.', isFact: false, explain: 'Myth. A clear rule, said with a smile and applied to everyone, usually feels fair, especially to the quiet people who finally get a turn.' },
        { text: 'Firm is about WHAT you hold onto; rude is about HOW you treat people.', isFact: true, explain: 'Mic drop. Lucía can hold her ground on the floor, the decision and the credit, while being kind to Diego as a person.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Firm vs harsh',
      before: {
        label: 'Harsh',
        text: '"Diego, you ALWAYS do this. Just stop talking for once."',
      },
      after: {
        label: 'Firm',
        text: '"Diego, I\'m nearly done. Hold that thought, I want to hear it next."',
      },
      notes: [
        'Both keep the floor.',
        'Firm talks about the moment; harsh attacks the person ("always").',
        'Firm promises a turn; harsh shuts the door.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Hard on the point, soft on the person. Firm keeps the floor; kindness keeps the team.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Myth or Mic Drop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ames and Flynn\'s research suggest about assertiveness in leaders?',
        options: [
          { text: 'The more forceful, the better', why: 'Too much damaged relationships.' },
          { text: 'Assertiveness doesn\'t matter', why: 'Both extremes hurt.' },
          { text: 'Too little and too much both hurt; the middle tended to rate best' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Firm, or harsh?',
        groups: ['Firm', 'Harsh'],
        items: [
          { text: '"I\'m nearly done, then you."', group: 0 },
          { text: '"You ALWAYS do this."', group: 1 },
          { text: '"One voice at a time today, for everyone."', group: 0 },
          { text: '"Just stop talking for once."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'If I hold the floor, everyone will like Diego more than me.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Firm and warm earns respect. Being talked over earns neither respect nor liking.' },
          { text: 'True, so let him take over.', why: 'Too little assertiveness hurts too.' },
          { text: 'Who cares about being liked? Crush him.', why: 'Too much assertiveness damages relationships.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Hard on the point, soft on the ___. (one word)',
        answers: ['person', 'people'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "you ALWAYS do this" harsh rather than firm?',
        options: [
          { text: 'It\'s too quiet', why: 'Volume isn\'t the issue.' },
          { text: 'It attacks the person instead of dealing with the moment' },
          { text: 'It\'s fine, it\'s honest', why: 'Honest, maybe. But it shuts the door.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a firm-and-warm response in order.',
        lines: ['Use his name: "Diego..."', 'Hold the floor: "I\'m nearly done."', 'Promise a turn: "I want to hear it next."', 'Keep the promise afterwards.'],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s rules for herself. Which one swings too far?',
        lines: [
          'Hold the floor with a warm, clear phrase.',
          'Never let anyone else speak until I\'m completely sure I\'m finished.',
          'Give everyone a turn, including Diego.',
        ],
        bug: 1,
        fix: 'Finish my point, then open the floor.',
        explanation: 'That\'s too much assertiveness. Hold the floor for your point, then share it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Silent writing first', 'Everyone thinks before talking'],
          ['Too little assertiveness', 'Less gets done'],
          ['Too much assertiveness', 'Relationships suffer'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: '[[1]] keeps the floor. [[2]] keeps the [[3]].',
        blanks: [['Firm', 'Firmness'], ['Kindness', 'Warmth'], ['team']],
        distractors: ['Shouting', 'Silence'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a firm, warm line.',
        tiles: ['I\'m', 'nearly', 'done,', 'then', 'I', 'want', 'to', 'hear', 'yours.'],
        distractors: ['always'],
      },
    ],
  },
  reflect: {
    prompt: 'Are you more likely to be too soft or too forceful when someone talks over you? What would "firm and warm" sound like for you?',
    starters: ['I tend to be...', 'Firm and warm, for me: ...'],
  },
  deepen: {
    title: 'Swap one "always"',
    summary: 'Next time you\'re frustrated with someone, catch any "you always" or "you never". Replace it with what\'s happening right now: "Right now, I need to finish this point."',
  },
  notes: 'Ames & Flynn (2007), Journal of Personality and Social Psychology 92(2): "What breaks a leader: the curvilinear relation between assertiveness and leadership" — both low and high assertiveness linked to worse leadership ratings (low: instrumental outcomes; high: social costs). Stated with "tended to". "Hard on the problem, soft on the people" echoes Fisher & Ury, Getting to Yes.',
};

export default lesson;
