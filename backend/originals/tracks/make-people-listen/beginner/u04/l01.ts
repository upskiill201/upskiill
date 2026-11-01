import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. On air: Lucía, "Diego finishes my sentences". Newly promoted, talked over in every meeting. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On air: "Diego finishes my sentences"',
  summary: 'Line 4, Mexico City. Lucía was promoted to lead a marketing team of six. Diego, the most experienced person on it, finishes her sentences, wrongly, in every meeting. Yesterday he finished her announcement about her own campaign.',
  minutes: 12,
  outcomes: [
    'See how a good update disappears when the floor isn\'t held',
    'Separate the interrupter\'s intent from the effect',
    'Know this chapter\'s goal: hold the floor and run a room where everyone is heard',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:50 p.m.',
      beats: [
        { speaker: 'tey', text: "Line 4, all the way from Mexico City. Lucía! Congratulations on the promotion!" },
        { speaker: 'lucia', text: 'Thank you. I lead six people now. Five of them are lovely. The sixth is Diego.' },
        { speaker: 'tey', text: "Uh-oh. What does Diego do?" },
        { speaker: 'lucia', text: 'He\'s been here twelve years. Everyone loves him. He\'s funny. And in every meeting he finishes my sentences. Yesterday I said, "The plan for the summer campaign is..." and he said, "...TikTok! Big influencers! Huge!" The plan was NOT TikTok. By the time I got the room back, the meeting was over.' },
        { speaker: 'tey', text: "Ignore-o-Meter: one team lead, six people, zero updates heard. Producer, what do we do with a Diego?" },
      ],
      choice: {
        prompt: 'Producer: what\'s the first thing to ask Lucía?',
        options: [
          {
            text: '"Does Diego do it to hurt you, or does he just get excited and not notice?"',
            outcome: 'Lucía sighs. "Honestly? He gets excited. He does it to everyone. He just does it to me most." That matters: we\'re dealing with a habit, not an enemy.',
            best: true,
          },
          {
            text: '"Have you tried shouting over him?"',
            outcome: 'Lucía laughs. "Twice. We ended up in a shouting match about TikTok." Volume wars rarely work.',
          },
          {
            text: '"Can you just move Diego to another team?"',
            outcome: 'Lucía: "He\'s brilliant at his job. I need him." Removing people isn\'t the first tool. Holding the floor is.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>This chapter's goal:</strong> help Lucía hold the floor, kindly and firmly, and run meetings where <em>everyone</em> gets heard, including the quiet ones and including Diego. Not by out-shouting him. By using a few tools that work.</p>",
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 4. Lucía and Diego.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is it useful to know Diego interrupts out of excitement, not malice?',
        options: [
          { text: 'It means Lucía should just accept it', why: 'Understanding it isn\'t accepting it.' },
          { text: 'It means Lucía can deal with a habit calmly instead of fighting an enemy' },
          { text: 'It doesn\'t matter at all', why: 'It changes which tools will work.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What happened, or why it happened?',
        groups: ['What happened', 'Why it happened'],
        items: [
          { text: 'Diego said "TikTok!"', group: 0 },
          { text: 'Diego gets excited and doesn\'t notice', group: 1 },
          { text: 'The meeting ended before Lucía got the room back', group: 0 },
          { text: 'Lucía didn\'t have a way to hold the floor', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Maybe I\'m not a real leader if I can\'t control one meeting.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Maybe you\'re right.', why: 'Tey FM never says that.' },
          { text: 'Leaders should shout.', why: 'Lucía already tried. TikTok won.' },
          { text: 'Holding the floor is a skill, not a personality. You can learn it this week.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Diego\'s interruptions are a ___, not an attack. (one word)',
        answers: ['habit'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put yesterday\'s meeting in order.',
        lines: ['Lucía starts: "The plan for the summer campaign is..."', 'Diego jumps in: "...TikTok!"', 'The room starts talking about TikTok.', 'The meeting ends.', 'Nobody heard the real plan.'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the goal of this chapter?',
        options: [
          { text: 'Hold the floor kindly and firmly, and run meetings where everyone is heard' },
          { text: 'Get Diego fired', why: 'He\'s brilliant at his job.' },
          { text: 'Never hold meetings again', why: 'Tempting. No.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s first plan. Which idea will probably backfire?',
        lines: [
          'Find out why Diego interrupts.',
          'Shout over him every time until he stops.',
          'Learn a few ways to hold the floor.',
        ],
        bug: 1,
        fix: 'Hold the floor calmly, with a clear phrase.',
        explanation: 'She already tried shouting. It turned into a shouting match about TikTok.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who\'s who on Tey FM?',
        pairs: [
          ['David', 'Said his idea into a notebook'],
          ['Arjun', 'Told them in paragraph four'],
          ['Lucía', 'Talked over in every meeting'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The producer\'s notes.',
        template: 'Diego isn\'t an [[1]]. He\'s [[2]]. Lucía needs to hold the [[3]].',
        blanks: [['enemy'], ['excited'], ['floor']],
        distractors: ['angry', 'microphone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s promise to Lucía.',
        tiles: ['Holding', 'the', 'floor', 'is', 'a', 'skill.'],
        distractors: ['personality', 'shout'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there someone who often talks over you, or someone you tend to talk over? What do you think is behind it: excitement, habit, status, something else?',
    starters: ['The person is...', 'I think it happens because...'],
  },
  deepen: {
    title: 'Count the interruptions',
    summary: 'In your next meeting or group conversation, quietly count interruptions: who interrupts whom, and how often. Patterns show up fast, and sometimes you\'ll find one of them is you.',
  },
  notes: 'Story setup. Lucía (newly promoted marketing lead, Mexico City) per CAST.md; Diego is a course-only character (not a villain; interrupts from excitement).',
};

export default lesson;
