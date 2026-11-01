import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Myth or Fact: your mood is contagious (Barsade 2002 ripple effect; Sy, Côté & Saavedra 2005). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Your mood is contagious',
  summary: 'In the meeting room, Lucía notices something strange. When she sounds calm, the team is calm. When her voice goes tight for a second, Tomás starts tapping his pen. Tey: "That\'s not your imagination."',
  minutes: 11,
  outcomes: [
    'Know what research says about emotions spreading in groups',
    'Know why the leader\'s mood spreads further',
    'Choose the mood you bring into the room',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Moods can spread from one person to a whole group.', isFact: true, explain: 'Fact. Yale researcher Sigal Barsade called it the "ripple effect". In a 2002 study, one trained actor showing a pleasant or unpleasant mood shifted the mood of the group, and with it how well they cooperated.' },
        { text: 'Only words spread emotions. Faces and tone don\'t matter.', isFact: false, explain: 'Myth. A lot of emotional contagion happens through faces, voice and posture. People tend to mimic each other without noticing. Lucía\'s tight voice reached Tomás before any words did.' },
        { text: 'A leader\'s mood can affect how well a team works together.', isFact: true, explain: 'Fact. In one study (Sy, Côté and Saavedra, 2005), teams with leaders in a positive mood showed more positive moods themselves and coordinated better. The evidence is strongest for mood and cooperation, so treat this as a strong nudge, not a guarantee.' },
        { text: 'A good leader should always look happy, whatever happens.', isFact: false, explain: 'Myth. Fake cheer in a crisis feels wrong, and people notice. Calm and honest beats cheerful and fake: "This is serious, and we can handle it."' },
        { text: 'You can choose, to some extent, what mood you bring into a room.', isFact: true, explain: 'Fact. A slow breath, a pause before speaking, a short walk before the meeting. You can\'t switch feelings off, but you can choose what you lead with.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Moods spread, and the leader\'s spreads furthest. Not fake cheer: calm and honest. Choose what you bring in.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, in the meeting room.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Barsade call emotions spreading through a group?',
        options: [
          { text: 'The domino effect', why: 'Close, but no.' },
          { text: 'The ripple effect' },
          { text: 'Group therapy', why: 'Not quite.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Only words spread emotions', group: 0 },
          { text: 'Moods can spread through a group', group: 1 },
          { text: 'Leaders should always look happy', group: 0 },
          { text: 'You can choose what you lead with', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'So I just have to pretend I\'m not stressed?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'No. Be honest that it\'s serious. Just lead with calm, not panic. Breathe before you speak.' },
          { text: 'Yes, smile through everything.', why: 'Fake cheer gets noticed.' },
          { text: 'Show them exactly how stressed you are.', why: 'Then everyone catches it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Moods spreading from person to person is called emotional ___. (one word)',
        answers: ['contagion', 'Contagion'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In Sy, Côté and Saavedra\'s study, teams with positive-mood leaders...',
        options: [
          { text: 'Got lazier', why: 'The opposite.' },
          { text: 'Saw no difference', why: 'They found a difference.' },
          { text: 'Showed more positive moods and coordinated better' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the signal to how it spreads.',
        pairs: [
          ['A tight voice', 'Tone'],
          ['A frown', 'Face'],
          ['Slumped shoulders', 'Posture'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for the crisis meeting. Which line will spread panic?',
        lines: [
          'One slow breath before I walk in.',
          'Check my phone for Carmen\'s messages every 30 seconds.',
          'Open with: "Serious, and fixable. Here are the facts."',
        ],
        bug: 1,
        fix: 'Phone in my bag. I\'ll check it once, at the end.',
        explanation: 'Anxious phone-checking is a mood, and everyone in the room will catch it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put choosing your mood in order.',
        lines: ['Notice how you feel', 'Take a slow breath', 'Pause before speaking', 'Lead with calm and honest'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Not fake [[1]]. Calm and [[2]].',
        blanks: [['cheer', 'happiness'], ['honest']],
        distractors: ['loud', 'panic'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s point.',
        tiles: ['The', 'leader\'s', 'mood', 'spreads', 'furthest.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone whose mood always changes the room, for better or worse. What do they do? What mood do you usually bring in?',
    starters: ['When they walk in...', 'I usually bring...'],
  },
  deepen: {
    title: 'The doorway breath',
    summary: 'Before your next meeting or class, take one slow breath at the door. Decide what you want to bring in.',
  },
  notes: 'Sigal G. Barsade (2002), "The Ripple Effect: Emotional Contagion and Its Influence on Group Behavior", Administrative Science Quarterly 47(4). Thomas Sy, Stéphane Côté & Richard Saavedra (2005), "The Contagious Leader", Journal of Applied Psychology 90(2). Mimicry mechanism: Hatfield, Cacioppo & Rapson (1994). Effects hedged as a strong nudge.',
};

export default lesson;
