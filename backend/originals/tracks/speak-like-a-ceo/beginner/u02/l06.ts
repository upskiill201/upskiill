import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Explain cards: speaking up when nobody asks. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Speaking up when nobody asks',
  summary: 'In the next leadership meeting, finance plans a price rise that Lucía knows will hurt chili-lime. Nobody asks her. Most people in her seat would stay quiet.',
  minutes: 12,
  outcomes: [
    'Know how common silence at work is',
    'Prepare one contribution before a meeting',
    'Raise a concern briefly and usefully',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Staying quiet is common. In interviews by Milliken, Morrison and Hewlin (2003), <strong>85%</strong> of employees said that at least once they had felt unable to raise an issue or concern with their bosses, even though they thought it was important.</p><p>How to speak up in a senior meeting:</p><table><tr><th>Do</th><th>Example</th></tr><tr><td><strong>Prepare one contribution</strong></td><td>Before the meeting, write the one thing you know that others may not.</td></tr><tr><td><strong>Speak early</strong></td><td>The longer you wait, the harder it gets. Aim for the first ten minutes.</td></tr><tr><td><strong>Link to the topic</strong></td><td>"On the price rise: one thing from the launch data."</td></tr><tr><td><strong>Give the fact, then the "so what"</strong></td><td>"When a rival raised prices 10% in May, their chips lost 15% of sales. I\'d test it in one region first."</td></tr><tr><td><strong>Keep it under 30 seconds</strong></td><td>Then stop and let them respond.</td></tr></table>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Prepare one contribution, speak early, give the fact and the "so what", keep it under 30 seconds.',
    },
  ],
  apply: {
    scenario: 'Speaking up.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What percentage of employees in Milliken\'s study had felt unable to raise a concern?',
        answers: ['85', '85%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why speak early in a meeting?',
        options: [
          { text: 'The longer you wait, the harder it gets' },
          { text: 'To be first to leave', why: 'It gets harder later.' },
          { text: 'It doesn\'t matter when', why: 'Waiting makes it harder.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful contribution or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: '"A rival lost 15% of sales after a 10% rise."', group: 0 },
          { text: '"I have a bad feeling about this."', group: 1 },
          { text: '"I\'d test it in one region first."', group: 0 },
          { text: 'Five minutes of background', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s words.',
        pairs: [
          ['Link to the topic', '"On the price rise..."'],
          ['The fact', '"A rival lost 15% of sales"'],
          ['The so what', '"Test it in one region first"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Nobody asked me. Isn\'t it rude to jump in?',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'You were invited because you know the launch. Linking to the topic and keeping it short is helpful, not rude.' },
          { text: 'Yes, wait to be asked.', why: 'You might never be.' },
          { text: 'Interrupt loudly.', why: 'Link in, briefly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two parts.',
        template: 'Give the [[1]], then the "so [[2]]".',
        blanks: [['fact'], ['what']],
        distractors: ['feeling', 'why'],
      },
      {
        kind: 'mcq',
        prompt: 'How much did the rival raise prices?',
        options: [
          { text: '10%' },
          { text: '15%', why: 'That\'s how much sales fell.' },
          { text: '50%', why: '10%.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Lucía\'s contribution?',
        lines: [
          '"On the price rise: one thing from the launch data."',
          '"A rival lost 15% of sales after a 10% rise."',
          '"But I\'m probably wrong, ignore me, it\'s fine."',
          '"I\'d test it in one region first."',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It takes back the point she just made.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Lucía speaks up.',
        lines: ['Prepare one contribution', 'Speak in the first ten minutes', 'Link to the topic', 'Fact, then so what', 'Stop'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds should a contribution take, at most?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Before your next meeting, write the one thing you know that others may not.',
    starters: ['My contribution:...'],
  },
  deepen: {
    title: 'Why people stay silent',
    summary: 'In Milliken\'s interviews, common reasons were fear of being seen as a complainer and worry about damaging relationships. A short, fact-based point with a suggestion lowers both risks.',
  },
  notes: 'Milliken, Morrison & Hewlin (2003), Journal of Management Studies, "An exploratory study of employee silence": 85% of 40 interviewees reported at least one occasion of not raising an issue. Fictional rival price data.',
};

export default lesson;
