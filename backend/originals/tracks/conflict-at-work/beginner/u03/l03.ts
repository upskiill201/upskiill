import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Explain cards: the ladder of inference. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The ladder of inference',
  summary: 'From "Fine." to "he thinks I\'m ruining the launch" took Grace about four seconds. Priya draws the ladder that explains how: one rung at a time, all inside Grace\'s head.',
  minutes: 12,
  outcomes: [
    'Know the rungs of the ladder of inference',
    'Spot when you\'ve climbed from facts to conclusions',
    'Climb back down to the facts',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Organisational researcher Chris Argyris described a "ladder of inference", later popularised by Peter Senge. It shows how we climb from what happened to what we do, often in seconds:</p><table><tr><th>Rung</th><th>Grace\'s climb</th></tr><tr><td>1. What happened</td><td>Femi wrote "Fine."</td></tr><tr><td>2. What I noticed</td><td>One word. A full stop. No emoji.</td></tr><tr><td>3. What I think it means</td><td>He\'s annoyed.</td></tr><tr><td>4. My assumption</td><td>He\'s annoyed with me, about the research.</td></tr><tr><td>5. My conclusion</td><td>He thinks I\'m ruining the launch.</td></tr><tr><td>6. What I do</td><td>Stop replying. Avoid him.</td></tr></table><p>Only rung 1 was a fact. Everything above it was Grace\'s story. Then her avoiding confirmed the story for both of them.</p><p><strong>Climb down</strong> by asking: "What did I actually see or hear? What else could it mean? How could I check?"</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Only the bottom rung is a fact. Climb down: what did I actually see? What else could it mean? How can I check?',
    },
  ],
  apply: {
    scenario: 'The ladder.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the rungs, bottom to top.',
        lines: ['What happened', 'What I noticed', 'What I think it means', 'My assumption', 'My conclusion', 'What I do'],
      },
      {
        kind: 'mcq',
        prompt: 'Which rung was the only fact in Grace\'s climb?',
        options: [
          { text: 'He\'s annoyed', why: 'That\'s an interpretation.' },
          { text: 'He thinks I\'m ruining the launch', why: 'That\'s a conclusion.' },
          { text: 'Femi wrote "Fine."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact or story?',
        groups: ['Fact', 'Story'],
        items: [
          { text: 'He skipped lunch on Wednesday', group: 0 },
          { text: 'He\'s avoiding me', group: 1 },
          { text: 'He replied in nine minutes', group: 0 },
          { text: 'He doesn\'t respect research', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the climb-down question to what it does.',
        pairs: [
          ['What did I actually see?', 'Back to the facts'],
          ['What else could it mean?', 'Other explanations'],
          ['How could I check?', 'A next step'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'It felt like a fact, not a story.',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Then it was a fact.', why: 'Feelings aren\'t facts.' },
          { text: 'That\'s the trick of the ladder. We climb so fast that the top feels like the bottom. Slowing down shows the rungs.' },
          { text: 'You\'re being silly.', why: 'Everyone climbs the ladder.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Only the [[1]] rung is a [[2]].',
        blanks: [['bottom', 'first'], ['fact']],
        distractors: ['top', 'feeling'],
      },
      {
        kind: 'mcq',
        prompt: 'How did Grace\'s action (avoiding) make things worse?',
        options: [
          { text: 'It confirmed the story for both of them' },
          { text: 'It didn\'t', why: 'Femi noticed her silence.' },
          { text: 'It fixed it', why: 'It deepened the misunderstanding.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rungs does the ladder have?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which rung of this climb is labelled wrongly?',
        lines: [
          'Fact: Priya wrote "Can we talk tomorrow?"',
          'Noticed: no reason given.',
          'Fact: I\'m in trouble.',
          'Action: barely sleep.',
        ],
        bug: 2,
        fix: 'Assumption: I might be in trouble.',
        explanation: '"I\'m in trouble" is a story, not a fact.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Climbing up or climbing down?',
        groups: ['Climbing up', 'Climbing down'],
        items: [
          { text: '"He must hate me."', group: 0 },
          { text: '"What did he actually write?"', group: 1 },
          { text: '"Everyone thinks so."', group: 0 },
          { text: '"What else could it mean?"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own ladder for a recent misunderstanding. Which rung was the only fact?',
    starters: ['What happened:...', 'My conclusion was...'],
  },
  deepen: {
    title: 'The reflexive loop',
    summary: 'Argyris noted that our conclusions change which facts we notice next. Once Grace believed Femi was angry, every skipped lunch "proved" it. Checking breaks the loop.',
  },
  notes: 'Ladder of inference: Chris Argyris (Overcoming Organizational Defenses, 1990), popularised in Senge et al., The Fifth Discipline Fieldbook (1994).',
};

export default lesson;
