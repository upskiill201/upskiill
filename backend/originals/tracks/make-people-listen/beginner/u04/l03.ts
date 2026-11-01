import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. "Producer's Notes" (card deck): holding the floor, politely. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Producer\'s Notes: holding the floor, politely',
  summary: 'Tey and Lucía role-play. Tey plays Diego, enthusiastically. Lucía gets interrupted nine times in two minutes. Then the producer hands her the notes.',
  minutes: 11,
  outcomes: [
    'Signal how long you\'ll talk before you start',
    'Keep going through a small interruption',
    'Use a friendly phrase to hold the floor',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Holding the floor isn't about being louder. It's about making it clear you haven't finished, kindly, so interrupting feels like the odd thing to do. Here are the Producer's Notes.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 1: Say how much is coming</h3><p>\"I've got three quick points, then I'd love your thoughts.\" Now everyone knows you're not done after point one, and that their turn is coming.</p><h3>Note 2: Don't stop mid-sentence</h3><p>When someone starts talking over you, many people stop instantly. Instead, keep going calmly to the end of your sentence. Often the interrupter stops first.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 3: Use a holding phrase</h3><p>If they keep going, use a calm, friendly line:</p><ul><li>\"Hold that thought, Diego, I'll come to you in a second.\"</li><li>\"Let me finish this one, then I want your view.\"</li><li>\"I'm nearly there.\"</li></ul><p>Say their name. Promise them a turn. Keep your tone warm.</p>",
    },
    {
      kind: 'check',
      question: 'Diego starts talking over Lucía mid-sentence. What\'s usually best first?',
      options: ['Keep going calmly to the end of her sentence', 'Stop immediately and wait', 'Talk much louder'],
      answer: 0,
      explanation: 'Carrying on calmly often makes the interrupter stop. If not, a friendly holding phrase comes next.',
    },
    {
      kind: 'text',
      html: "<h3>Note 4: A small gesture helps</h3><p>A raised, open hand (like a gentle \"one moment\") while you keep talking does a lot of the work for you.</p><h3>Note 5: Then keep your promise</h3><p>When you finish: \"Diego, you wanted to say something?\" Keeping the promise is what makes the holding phrase feel fair, so people accept it next time.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say how much is coming. Finish your sentence. "Hold that thought, I\'ll come to you." Then keep the promise.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Producer\'s Notes. Role-play with Tey as Diego.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why say "I\'ve got three quick points" at the start?',
        options: [
          { text: 'To sound important', why: 'It\'s about the listeners knowing what\'s coming.' },
          { text: 'It\'s a legal requirement', why: 'Not quite.' },
          { text: 'Everyone knows you\'re not finished after point one, and that their turn is coming' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Diego interrupts. Put Lucía\'s response in order.',
        lines: ['Finish her sentence calmly.', 'Raise an open hand.', '"Hold that thought, Diego, I\'ll come to you."', 'Finish her point.', '"Diego, you wanted to say something?"'],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(cutting in) Oh oh oh, I know, I know: TikTok!',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: '"Diego, STOP interrupting me!"', why: 'Fair, but it turns into a fight in front of the team.' },
          { text: '"Hold that thought, Diego. I\'ll come to you in a second." (keeps going)' },
          { text: '(stops and lets him talk)', why: 'That\'s how the summer plan became TikTok.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After using a holding phrase, always keep your ___. (one word)',
        answers: ['promise', 'word'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Holds the floor, or gives it away?',
        groups: ['Holds it', 'Gives it away'],
        items: [
          { text: 'Finishing your sentence calmly', group: 0 },
          { text: 'Stopping mid-word', group: 1 },
          { text: '"I\'m nearly there."', group: 0 },
          { text: '"Sorry, sorry, go ahead."', group: 1 },
          { text: 'A raised open hand', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does keeping the promise ("Diego, you wanted to say something?") matter?',
        options: [
          { text: 'It makes holding the floor feel fair, so people accept it next time' },
          { text: 'It\'s polite but doesn\'t matter', why: 'It\'s what makes the tool work long term.' },
          { text: 'It gives Diego the whole meeting', why: 'Just his turn.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s holding phrases. Which one is likely to start a fight?',
        lines: [
          'Let me finish this one, then I want your view.',
          'Can you EVER let anyone finish, Diego?',
          'Hold that thought, I\'ll come to you.',
        ],
        bug: 1,
        fix: 'I\'m nearly there, Diego.',
        explanation: 'Sarcasm in front of the team makes it personal. Warm and firm beats sharp.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['"Three quick points"', 'Say how much is coming'],
          ['"Hold that thought"', 'A holding phrase'],
          ['Open hand, still talking', 'A gesture that helps'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s holding phrase.',
        template: 'Hold that [[1]], Diego. I\'ll come to [[2]] in a [[3]].',
        blanks: [['thought'], ['you'], ['second', 'moment', 'minute']],
        distractors: ['shout', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s opening.',
        tiles: ['I\'ve', 'got', 'three', 'quick', 'points,', 'then', 'your', 'thoughts.'],
        distractors: ['sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Which holding phrase sounds most like you? Write your own version that you\'d actually say.',
    starters: ['My holding phrase: ...', 'I\'d say it when...'],
  },
  deepen: {
    title: 'Finish the sentence',
    summary: 'Next time someone starts talking while you\'re mid-sentence, don\'t stop: finish your sentence calmly. Notice how often the other person stops first.',
  },
  notes: 'Floor-holding techniques (previewing length, completing the sentence, holding phrases, gesture, returning the floor) are standard meeting-facilitation and assertiveness advice.',
};

export default lesson;
