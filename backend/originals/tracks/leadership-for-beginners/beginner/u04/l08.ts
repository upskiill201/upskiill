import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Card deck: asking for feedback on yourself (self-awareness research; feedback-seeking). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Asking for feedback on yourself',
  summary: 'At the end of the Diego conversation, he said: "Can I give YOU some feedback?" Lucía froze. Then said yes. It was the most useful thing she heard all month. Tey deals out the cards.',
  minutes: 11,
  outcomes: [
    'Know why leaders often can\'t see their own blind spots',
    'Ask for feedback in a way that gets honest answers',
    'Respond to feedback without defending yourself',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Diego said: \"When you're stressed, you rewrite people's work without telling them. It makes us feel like you don't trust us.\" Lucía had no idea. That's normal. The higher you go, the less honest feedback you tend to get, because people worry about saying it to the boss. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Most of us aren't as self-aware as we think</h3><p>Organisational psychologist <strong>Tasha Eurich</strong> found that most people believe they're self-aware, but her research suggests only around 10–15% really are. Other people often see us more clearly than we see ourselves.</p><h3>Card 2: Ask a specific question</h3><p>\"Any feedback for me?\" gets \"No, all good!\" Instead: \"What's one thing I could do better in our meetings?\" A specific question gives people permission.</p><h3>Card 3: Ask for one thing</h3><p>One thing feels safe to say. \"Tell me everything you think of me\" feels like a trap.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Say thank you, and only thank you</h3><p>Don't explain, don't defend, don't justify. \"Thank you. That's really useful.\" If you argue, they'll never tell you anything again.</p><h3>Card 5: Do something with it, visibly</h3><p>Change one thing, and tell them: \"You said I rewrite work. I'm going to tell you first from now on.\" That's what makes people bother next time.</p><h3>Card 6: Ask again</h3><p>A month later: \"Have I got better at that?\" Asking again shows you meant it.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the best response when someone gives you feedback?',
      options: ['"Thank you. That\'s really useful."', '"Actually, the reason I do that is..."', '"Well, you do it too."'],
      answer: 0,
      explanation: 'Explaining feels reasonable, but it sounds like defending. Just thank them.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask a specific question. Ask for one thing. Say only thank you. Change something visibly. Ask again later.',
    },
  ],
  apply: {
    scenario: 'Diego\'s feedback for Lucía.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do leaders often get less honest feedback?',
        options: [
          { text: 'Leaders are always right', why: 'Nobody is.' },
          { text: 'Nobody has opinions about them', why: 'Everyone does. They just don\'t say them.' },
          { text: 'People worry about saying hard things to the boss' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'When you\'re stressed, you rewrite people\'s work without telling them.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Thank you. I didn\'t know that. That\'s really useful.' },
          { text: 'Only because the work wasn\'t good enough.', why: 'Defending. He won\'t tell her anything again.' },
          { text: 'Well, you make jokes in meetings.', why: 'Tit for tat.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Gets honest feedback, or shuts it down?',
        groups: ['Gets honest feedback', 'Shuts it down'],
        items: [
          { text: '"What\'s one thing I could do better?"', group: 0 },
          { text: '"Any feedback? No? Great."', group: 1 },
          { text: '"Thank you, that\'s useful."', group: 0 },
          { text: '"Actually, the reason I do that is..."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When someone gives you feedback, say only: thank ___. (one word)',
        answers: ['you', 'You'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Tasha Eurich\'s research suggests roughly how many people are truly self-aware?',
        options: [
          { text: 'About 95%', why: 'That\'s roughly how many THINK they are.' },
          { text: 'About 10–15%' },
          { text: 'Everyone', why: 'Far from it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the line.',
        pairs: [
          ['Specific question', '"One thing I could do better in meetings?"'],
          ['Change visibly', '"I\'ll tell you first from now on."'],
          ['Ask again', '"Have I got better at that?"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan after Diego\'s feedback. Which line undoes it?',
        lines: [
          'Thank Diego, today.',
          'Explain to the team why I rewrite their work.',
          'From now on, tell people before I change their work.',
        ],
        bug: 1,
        fix: 'Tell the team what I\'m changing, and ask them to call me on it.',
        explanation: 'Explaining sounds like defending. Changing visibly is what counts.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put asking for feedback in order.',
        lines: ['Ask one specific question', 'Say thank you, only', 'Change one thing visibly', 'Ask again later'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Don\'t [[1]]. Don\'t [[2]]. Just say [[3]] you.',
        blanks: [['explain', 'defend'], ['argue', 'justify', 'defend'], ['thank']],
        distractors: ['sorry', 'forget'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s question for her next one-on-one.',
        tiles: ['What\'s', 'one', 'thing', 'I', 'could', 'do', 'better?'],
        distractors: ['everything'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you think is one blind spot people around you might see in you? Who could you ask about it?',
    starters: ['My guess is...', 'I could ask...'],
  },
  deepen: {
    title: 'Ask one person',
    summary: 'This week, ask one person: "What\'s one thing I could do better?" Say only thank you. Then do something with it.',
  },
  notes: 'Tasha Eurich, Insight (2017) and "What Self-Awareness Really Is (and How to Cultivate It)", HBR (2018): ~95% believe they are self-aware vs an estimated 10–15% who are. Feedback-seeking and power distance: Ashford & Cummings (1983) and later work, hedged. Fictional feedback content.',
};

export default lesson;
