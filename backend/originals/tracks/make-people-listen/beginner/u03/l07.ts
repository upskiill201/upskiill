import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. "Producer's Notes" (card deck): eye contact, more isn't always better (Chen et al. 2013, hedged). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Producer\'s Notes: eye contact, more isn\'t always better',
  summary: 'David has read online that confident people "hold eye contact at all times". He tried it at lunch. His friend asked if he was angry. Tey: "Producer\'s Notes on eye contact, please."',
  minutes: 11,
  outcomes: [
    'Use eye contact to connect, not to stare',
    'Know that intense eye contact can backfire when people disagree',
    'Share your gaze around a group',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Eye contact matters. Looking at your notebook is how David's first idea vanished. But \"stare at people\" isn't the fix either. Here are the Producer's Notes.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 1: Look up for the key moment</h3><p>When you say your main idea, look at the people you're talking to. Notes and phones can wait. Looking up says \"this is for you\".</p><h3>Note 2: Connect, don't lock on</h3><p>Natural eye contact comes and goes. People look away to think, then look back. Holding someone's gaze without a break can feel intense, even aggressive.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 3: More isn't always more persuasive</h3><p>A 2013 study found something surprising. When listeners already <strong>disagreed</strong> with a speaker, those who looked more at the speaker's eyes were <em>less</em> persuaded. The researchers suggested heavy eye contact can feel like pressure, so people push back.</p><p>So: friendly eye contact, yes. A staring contest, no.</p>",
    },
    {
      kind: 'check',
      question: 'In the 2013 study, what happened when listeners who already disagreed made more eye contact with the speaker?',
      options: ['They were less persuaded', 'They were much more persuaded', 'They fell asleep'],
      answer: 0,
      explanation: 'With listeners who already disagreed, more eye contact was linked to less persuasion. It can feel like pressure.',
    },
    {
      kind: 'text',
      html: "<h3>Note 4: Share it around the group</h3><p>In a group, give a sentence or so to one person, then move to another. Include the quiet ones and the people at the edges. Everyone feels spoken to; nobody feels stared at.</p><h3>Note 5: It's cultural, too</h3><p>Comfortable eye contact varies between cultures, families and people. Watch how much the other person gives you, and roughly match it.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Look up for your key idea. Connect, don\'t stare. Share your gaze around. Match the other person.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Producer\'s Notes on eye contact.',
    items: [
      {
        kind: 'mcq',
        prompt: 'David held eye contact nonstop at lunch. What happened?',
        options: [
          { text: 'He was elected class president', why: 'Not quite.' },
          { text: 'His friend asked if he was angry' },
          { text: 'Nobody noticed', why: 'They noticed.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful eye contact, or too much?',
        groups: ['Helpful', 'Too much'],
        items: [
          { text: 'Looking up when you say your idea', group: 0 },
          { text: 'Staring without blinking', group: 1 },
          { text: 'Moving your gaze around the group', group: 0 },
          { text: 'Locking eyes with someone who disagrees', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'So should I just look at the floor then? It\'s easier.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Look up for your key idea and share your gaze around. Looking away to think is fine.' },
          { text: 'Yes, the floor is safest.', why: 'That\'s how the notebook incident happened.' },
          { text: 'Stare harder.', why: 'Lunch already proved that one.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a group, ___ your gaze around, a sentence or so per person. (one word)',
        answers: ['share', 'move', 'spread'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why might lots of eye contact backfire with someone who disagrees?',
        options: [
          { text: 'It makes you look tired', why: 'Not the reason.' },
          { text: 'It can feel like pressure, so they push back' },
          { text: 'It never backfires', why: 'The 2013 study suggests it can.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s eye contact plan for the group in order.',
        lines: ['Look up from your notes.', 'Say the idea to one person.', 'Move to another person for the next sentence.', 'Include someone at the edge of the group.'],
      },
      {
        kind: 'findBug',
        prompt: 'David\'s eye-contact rules. Which one is wrong?',
        lines: [
          'Look up when I say my main idea.',
          'Never look away, not even once, so I seem confident.',
          'Move my gaze around the group.',
        ],
        bug: 1,
        fix: 'It\'s fine to look away to think, then look back.',
        explanation: 'Natural eye contact comes and goes. Nonstop staring feels intense.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Speak early', 'In the first five minutes'],
          ['Say it once', 'Not three hints'],
          ['Look up', 'For your key idea'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The Producer\'s Notes.',
        template: '[[1]], don\'t stare. Share your gaze [[2]]. [[3]] the other person.',
        blanks: [['Connect'], ['around'], ['Match']],
        distractors: ['Lock', 'Ignore'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the rule.',
        tiles: ['Look', 'up', 'for', 'your', 'key', 'idea.'],
        distractors: ['down', 'stare'],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you look when you speak in a group: your notes, one person, everyone, the floor? What would you change?',
    starters: ['I usually look at...', 'Next time, I\'ll...'],
  },
  deepen: {
    title: 'The edge of the room',
    summary: 'In your next group conversation, make a point of looking at the quietest person or someone at the edge for one sentence. Notice how they respond, and how the group feels.',
  },
  notes: 'Chen, Minson, Schöne & Heinrichs (2013), Psychological Science 24(11): "In the eye of the beholder" — more eye contact with a speaker was associated with less attitude change among listeners who disagreed; instructed eye-gaze reduced persuasion. Stated with "suggested". Cultural variation in eye-contact norms is well documented.',
};

export default lesson;
