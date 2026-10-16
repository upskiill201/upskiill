import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: Tomás hides a mistake for three days. Why people hide problems from the boss. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Tomás hides a mistake',
  summary: 'Week 3, Friday, 4:40 p.m. Tomás appears at Lucía\'s desk, pale. "Can I show you something?" The newsletter has been sending the wrong discount code to 12,000 customers. Since Tuesday.',
  minutes: 11,
  outcomes: [
    'See why people hide mistakes from their manager',
    'Notice how the leader\'s first reaction shapes what happens next time',
    'Know this chapter\'s goal: know your people, and make it safe to speak up',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Friday, 4:40 p.m.',
      beats: [
        { speaker: 'tomas', text: 'Can I show you something? The newsletter... the discount code is wrong. It says SUMMER50. It should be SUMMER15. It\'s been going out since Tuesday.' },
        { speaker: 'lucia', text: 'Since TUESDAY? Why am I hearing this on Friday at 4:40?' },
        { speaker: 'tomas', text: 'I noticed on Wednesday. I tried to fix it myself. I didn\'t want you to think I couldn\'t do the job. Your first month and everything.' },
        { speaker: 'narrator', text: '12,000 customers. Some have already used the code. Lucía feels her face go hot. She has about three seconds to decide what her face is going to do.' },
      ],
      choice: {
        prompt: 'What should Lucía say first?',
        options: [
          {
            text: '"Thank you for telling me. Let\'s fix it together first, then work out what happened."',
            outcome: 'Tomás breathes out. They stop the newsletter in ten minutes. Later, Lucía asks what made him wait, and learns something about her team.',
            best: true,
          },
          {
            text: '"How could you not tell me for three days?"',
            outcome: 'True, and fair to feel. But said first, it teaches Tomás one lesson: next time, hide it longer.',
          },
          {
            text: '"Don\'t worry, I\'ll handle it."',
            outcome: 'Kind, but Tomás learns nothing, and Lucía is fixing newsletters at 7 p.m. on a Friday.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Tomás didn't hide the mistake because he's dishonest. He hid it because he was scared of what it would say about him. <strong>This chapter:</strong> getting to know each person (one-on-ones, what motivates them, how to listen), and building a team where bad news travels fast. That's called psychological safety, and Google found it mattered more than anything else in its best teams.</p>",
    },
  ],
  apply: {
    scenario: 'Week 3, Friday afternoon.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Tomás wait three days?',
        options: [
          { text: 'He didn\'t care', why: 'He cared a lot. That\'s why he hid it.' },
          { text: 'He was afraid of what the mistake would say about him' },
          { text: 'He forgot', why: 'He noticed on Wednesday.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does each first reaction teach Tomás?',
        groups: ['Tell me sooner', 'Hide it better'],
        items: [
          { text: '"Thank you for telling me."', group: 0 },
          { text: '"How could you be so careless?"', group: 1 },
          { text: '"Let\'s fix it together."', group: 0 },
          { text: 'A loud sigh and an eye-roll', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I\'m so sorry. I know it\'s bad.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'It is bad.', why: 'True, and it shuts him down.' },
          { text: 'It\'s fine, really, no problem at all.', why: 'It\'s not fine. Calm and honest beats pretend.' },
          { text: 'It\'s fixable. Thank you for coming to me. Let\'s stop the newsletter first.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A team where people feel safe to admit mistakes has psychological ___. (one word)',
        answers: ['safety'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the right order for handling Tomás\'s mistake.',
        lines: ['Thank him for telling you', 'Fix the problem together', 'Ask what happened, calmly', 'Agree what to do next time'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s this chapter\'s goal?',
        options: [
          { text: 'Know your people, and make it safe to speak up' },
          { text: 'Catch people making mistakes', why: 'The opposite.' },
          { text: 'Never make mistakes', why: 'Nobody can promise that.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s reply, draft 1. Which line teaches Tomás to hide things?',
        lines: [
          'Thank you for telling me.',
          'But if this happens again, you\'re off the newsletter for good.',
          'Let\'s stop it and email a correction.',
        ],
        bug: 1,
        fix: 'Next time, come to me as soon as you notice. We\'ll fix it faster together.',
        explanation: 'A threat in the same breath as "thank you" cancels the thank you.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Influence', 'Earned, not given'],
          ['Early win', 'Small, visible, theirs'],
          ['Coaching', 'Show them, don\'t do it'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Make it [[1]] for bad news to travel [[2]], so problems get fixed [[3]].',
        blanks: [['safe'], ['fast'], ['early', 'sooner']],
        distractors: ['scary', 'later'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s first words.',
        tiles: ['Thank', 'you', 'for', 'telling', 'me.'],
        distractors: ['Why'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever hidden a mistake from a boss, teacher or parent? What made you hide it, and what would have made you speak up sooner?',
    starters: ['I hid it because...', 'I\'d have spoken up if...'],
  },
  deepen: {
    title: 'Watch your face',
    summary: 'Next time someone brings you bad news, notice your first reaction, your face as much as your words. It decides whether they\'ll bring you the next one.',
  },
  notes: 'Story setup. Speaking up and error reporting depend on psychological safety (Edmondson 1999). Fictional figures (12,000 customers, the codes).',
};

export default lesson;
